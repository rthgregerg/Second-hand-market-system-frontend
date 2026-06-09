"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreditScore = exports.getUserReviews = exports.createReview = void 0;
const request_1 = require("./request");
function createReview(orderId, rating, content) {
    return (0, request_1.post)('/api/v1/reviews', { orderId, rating, content });
}
exports.createReview = createReview;
function getUserReviews(userId, page = 1, size = 10) {
    return (0, request_1.get)(`/api/v1/reviews/user/${userId}`, { page, size });
}
exports.getUserReviews = getUserReviews;
function getCreditScore(userId) {
    return (0, request_1.get)(`/api/v1/reviews/user/${userId}/score`);
}
exports.getCreditScore = getCreditScore;
