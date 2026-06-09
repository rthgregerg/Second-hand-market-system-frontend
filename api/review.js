"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = createReview;
exports.getUserReviews = getUserReviews;
exports.getCreditScore = getCreditScore;
const request_1 = require("./request");
function createReview(orderId, rating, content) {
    return (0, request_1.post)('/api/v1/reviews', { orderId, rating, content });
}
function getUserReviews(userId, page = 1, size = 10) {
    return (0, request_1.get)(`/api/v1/reviews/user/${userId}`, { page, size });
}
function getCreditScore(userId) {
    return (0, request_1.get)(`/api/v1/reviews/user/${userId}/score`);
}
