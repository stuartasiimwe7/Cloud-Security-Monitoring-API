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
var AwsSecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSecurityService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const security_event_entity_1 = require("../security-event.entity");
let AwsSecurityService = AwsSecurityService_1 = class AwsSecurityService {
    constructor(securityEventRepo) {
        this.securityEventRepo = securityEventRepo;
        this.logger = new common_1.Logger(AwsSecurityService_1.name);
        AWS.config.update({ region: process.env.AWS_REGION });
        this.cloudTrail = new AWS.CloudTrail();
    }
    async fetchCloudTrailEvents() {
        try {
            const params = { MaxResults: 5 };
            const data = await this.cloudTrail.lookupEvents(params).promise();
            for (const event of data.Events || []) {
                const { EventName, EventSource, CloudTrailEvent } = event;
                const AwsRegion = event.AwsRegion || 'unknown';
                const details = CloudTrailEvent ? JSON.parse(CloudTrailEvent) : {};
                await this.securityEventRepo.save({
                    eventName: EventName,
                    eventSource: EventSource,
                    awsRegion: AwsRegion,
                    timestamp: event.EventTime ? new Date(event.EventTime) : new Date(),
                    userIdentity: details.userIdentity || {},
                    eventDetails: CloudTrailEvent || 'N/A',
                });
            }
            this.logger.log('Fetched CloudTrail events successfully.');
        }
        catch (error) {
            this.logger.error('Error fetching CloudTrail events:', error);
        }
    }
};
exports.AwsSecurityService = AwsSecurityService;
exports.AwsSecurityService = AwsSecurityService = AwsSecurityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(security_event_entity_1.SecurityEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AwsSecurityService);
//# sourceMappingURL=aws-security.service.js.map