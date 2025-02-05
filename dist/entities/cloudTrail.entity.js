"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudTrailEvent = void 0;
const typeorm_1 = require("typeorm");
let CloudTrailEvent = class CloudTrailEvent {
};
exports.CloudTrailEvent = CloudTrailEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CloudTrailEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CloudTrailEvent.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CloudTrailEvent.prototype, "eventName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CloudTrailEvent.prototype, "eventSource", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CloudTrailEvent.prototype, "eventTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CloudTrailEvent.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], CloudTrailEvent.prototype, "cloudTrailEvent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CloudTrailEvent.prototype, "receivedAt", void 0);
exports.CloudTrailEvent = CloudTrailEvent = __decorate([
    (0, typeorm_1.Entity)('cloudtrail_events')
], CloudTrailEvent);
//# sourceMappingURL=cloudTrail.entity.js.map