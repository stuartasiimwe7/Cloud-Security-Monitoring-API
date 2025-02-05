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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudTrailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cloudTrail_entity_1 = require("../entities/cloudTrail.entity");
let CloudTrailService = class CloudTrailService {
    constructor(cloudTrailEventRepository) {
        this.cloudTrailEventRepository = cloudTrailEventRepository;
    }
    async saveEvent(eventData) {
        const cloudTrailEvent = this.cloudTrailEventRepository.create({
            eventId: eventData.eventID || eventData.EventId,
            eventTime: new Date(eventData.eventTime || eventData.EventTime),
            eventSource: eventData.eventSource || eventData.EventSource,
            eventName: eventData.eventName || eventData.EventName,
            username: eventData.Username || eventData.userIdentity?.userName || 'Unknown',
            cloudTrailEvent: eventData,
        });
        return await this.cloudTrailEventRepository.save(cloudTrailEvent);
    }
};
exports.CloudTrailService = CloudTrailService;
exports.CloudTrailService = CloudTrailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cloudTrail_entity_1.CloudTrailEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CloudTrailService);
//# sourceMappingURL=cloud-trail.service.js.map