// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title JexReviewContract
/// @author Grupo JEX
/// @notice Gestiona reseñas entre empleadores y trabajadores de eventos.
/// @dev Flujo de estados: Created -> Validated -> Published -> Invalidated.
contract JexReviewContract {
    /// @notice Estados posibles de una reseña.
    enum ReviewState {
        Created,
        Validated,
        Published,
        Invalidated
    }

    /// @notice Datos de una reseña on-chain.
    struct Review {
        uint256 reviewId;
        address reviewer;
        address reviewed;
        uint8 rating;         // 1 a 5
        string commentHash;   // hash del comentario (o CID/IPFS)
        uint256 timestamp;    // marca de tiempo aproximada
        uint256 eventId;      // id del evento/turno en JEX
        ReviewState state;
    }

    /// @notice Dirección del moderador que puede validar/publicar/invalidar reseñas.
    address public moderator;

    /// @notice Id incremental para las reseñas.
    uint256 public nextReviewId;

    /// @notice reviewId => Review
    mapping(uint256 => Review) public reviews;

    /// @notice Usuario => ids de reseñas recibidas.
    mapping(address => uint256[]) private reviewsReceived;

    /// @notice Usuario => ids de reseñas emitidas.
    mapping(address => uint256[]) private reviewsGiven;

    /// @notice eventId => reviewer => reviewed => ya existe reseña?
    mapping(uint256 => mapping(address => mapping(address => bool))) public reviewExists;

    /// @notice Suma de ratings de reseñas PUBLICADAS por usuario.
    mapping(address => uint256) public totalRating;

    /// @notice Cantidad de reseñas PUBLICADAS por usuario.
    mapping(address => uint256) public ratingCount;

    /// @notice Se emite cuando se crea una reseña.
    event ReviewCreated(
        uint256 indexed reviewId,
        address indexed reviewer,
        address indexed reviewed,
        uint8 rating,
        uint256 eventId
    );

    /// @notice Se emite cuando una reseña pasa a Validated.
    event ReviewValidated(
        uint256 indexed reviewId,
        address indexed moderator
    );

    /// @notice Se emite cuando una reseña pasa a Published.
    event ReviewPublished(
        uint256 indexed reviewId,
        address indexed moderator
    );

    /// @notice Se emite cuando una reseña es invalidada por el moderador.
    event ReviewInvalidated(
        uint256 indexed reviewId,
        address indexed moderator
    );

    /// @notice Se emite cuando se despliega el contrato.
    event ContractDeployed(address indexed moderator);

    /// @notice Restringe funciones a solo el moderador actual.
    modifier onlyModerator() {
        require(msg.sender == moderator, "Solo el moderador puede ejecutar esta accion");
        _;
    }

    /// @notice Constructor: define al deployer como moderador inicial.
    constructor() {
        moderator = msg.sender;
        emit ContractDeployed(moderator);
    }

    /// @notice Crea una reseña en estado Created.
    /// @param _reviewed Direccion del usuario calificado.
    /// @param _rating Puntuacion entre 1 y 5.
    /// @param _commentHash Hash del comentario off-chain.
    /// @param _eventId Identificador del evento/turno asociado.
    /// @return reviewId Id de la reseña creada.
    function createReview(
        address _reviewed,
        uint8 _rating,
        string calldata _commentHash,
        uint256 _eventId
    ) external returns (uint256 reviewId) {
        require(_reviewed != address(0), "Direccion a calificar invalida");
        require(msg.sender != _reviewed, "No podes calificarte a vos mismo");
        require(_rating >= 1 && _rating <= 5, "Rating invalido");
        require(!reviewExists[_eventId][msg.sender][_reviewed], "Ya calificaste este evento");

        reviewId = nextReviewId;

        Review storage r = reviews[reviewId];
        r.reviewId = reviewId;
        r.reviewer = msg.sender;
        r.reviewed = _reviewed;
        r.rating = _rating;
        r.commentHash = _commentHash;
        r.timestamp = block.timestamp;
        r.eventId = _eventId;
        r.state = ReviewState.Created;

        reviewsReceived[_reviewed].push(reviewId);
        reviewsGiven[msg.sender].push(reviewId);

        reviewExists[_eventId][msg.sender][_reviewed] = true;
        nextReviewId = nextReviewId + 1;

        emit ReviewCreated(reviewId, msg.sender, _reviewed, _rating, _eventId);
    }

    /// @notice Valida una reseña (no impacta aún en el promedio).
    /// @param _reviewId Id de la reseña a validar.
    function validateReview(uint256 _reviewId) external onlyModerator {
        Review storage r = reviews[_reviewId];
        require(r.reviewer != address(0), "Resena inexistente");
        require(r.state == ReviewState.Created, "Solo resenas nuevas");

        r.state = ReviewState.Validated;

        emit ReviewValidated(_reviewId, msg.sender);
    }

    /// @notice Publica una reseña (ahora sí impacta en el promedio).
    /// @param _reviewId Id de la reseña a publicar.
    function publishReview(uint256 _reviewId) external onlyModerator {
        Review storage r = reviews[_reviewId];
        require(r.reviewer != address(0), "Resena inexistente");
        require(r.state == ReviewState.Validated, "Solo resenas validadas");

        r.state = ReviewState.Published;

        totalRating[r.reviewed] = totalRating[r.reviewed] + r.rating;
        ratingCount[r.reviewed] = ratingCount[r.reviewed] + 1;

        emit ReviewPublished(_reviewId, msg.sender);
    }

    /// @notice Invalida una reseña. Si estaba publicada, ajusta el promedio.
    /// @param _reviewId Id de la reseña a invalidar.
    function invalidateReview(uint256 _reviewId) external onlyModerator {
        Review storage r = reviews[_reviewId];
        require(r.reviewer != address(0), "Resena inexistente");
        require(r.state != ReviewState.Invalidated, "Ya invalidada");

        if (r.state == ReviewState.Published) {
            if (ratingCount[r.reviewed] > 0 && totalRating[r.reviewed] >= r.rating) {
                totalRating[r.reviewed] = totalRating[r.reviewed] - r.rating;
                ratingCount[r.reviewed] = ratingCount[r.reviewed] - 1;
            }
        }

        r.state = ReviewState.Invalidated;

        emit ReviewInvalidated(_reviewId, msg.sender);
    }

    /// @notice Devuelve todas las reseñas RECIBIDAS por un usuario.
    function getReviewsReceived(address _user) external view returns (Review[] memory result) {
        uint256[] storage ids = reviewsReceived[_user];
        uint256 len = ids.length;
        result = new Review[](len);

        for (uint256 i = 0; i < len; ) {
            result[i] = reviews[ids[i]];
            unchecked { ++i; }
        }
    }

    /// @notice Devuelve todas las reseñas EMITIDAS por un usuario.
    function getReviewsGiven(address _user) external view returns (Review[] memory result) {
        uint256[] storage ids = reviewsGiven[_user];
        uint256 len = ids.length;
        result = new Review[](len);

        for (uint256 i = 0; i < len; ) {
            result[i] = reviews[ids[i]];
            unchecked { ++i; }
        }
    }

    /// @notice Devuelve el promedio de rating * 100 (ej: 435 => 4.35).
    function getAverageRating(address _user) external view returns (uint256 average) {
        uint256 count = ratingCount[_user];
        if (count == 0) {
            return 0;
        }
        average = (totalRating[_user] * 100) / count;
    }
}
