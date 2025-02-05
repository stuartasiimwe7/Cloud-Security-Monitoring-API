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
exports.AwsSecurityController = void 0;
const common_1 = require("@nestjs/common");
const aws_security_service_1 = require("./aws-security.service");
const aws_cloudtrail_service_1 = require("./aws-cloudtrail.service");
let AwsSecurityController = class AwsSecurityController {
    constructor(awsSecurityService, awsCloudTrailService) {
        this.awsSecurityService = awsSecurityService;
        this.awsCloudTrailService = awsCloudTrailService;
    }
    async fetchCloudTrailEvents() {
        try {
            await this.awsSecurityService.fetchCloudTrailEvents();
            return { message: 'Fetching CloudTrail events...' };
        }
        catch (error) {
            console.error('Error fetching CloudTrail events:', error);
            throw new common_1.HttpException('Failed to fetch CloudTrail events', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getEvents() {
        try {
            const events = await this.awsCloudTrailService.getRecentSecurityEvents();
            return events;
        }
        catch (error) {
            console.error('Error fetching security events:', error);
            throw new common_1.HttpException('Damn! Failed to retrieve security events', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AwsSecurityController = AwsSecurityController;
__decorate([
    (0, common_1.Get)('fetch-events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AwsSecurityController.prototype, "fetchCloudTrailEvents", null);
__decorate([
    (0, common_1.Get)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AwsSecurityController.prototype, "getEvents", null);
exports.AwsSecurityController = AwsSecurityController = __decorate([
    (0, common_1.Controller)('aws-security'),
    __metadata("design:paramtypes", [aws_security_service_1.AwsSecurityService,
        aws_cloudtrail_service_1.AwsCloudTrailService])
], AwsSecurityController);
//# sourceMappingURL=aws-security.controller.js.map