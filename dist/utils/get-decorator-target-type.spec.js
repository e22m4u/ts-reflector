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
/* eslint @typescript-eslint/no-unused-vars: 0 */
const chai_1 = require("chai");
const src_1 = require("../../src");
const get_decorator_target_type_1 = require("./get-decorator-target-type");
describe('getDecoratorTargetType', () => {
    const validate = function (value) {
        return function (target, propertyKey, descriptorOrIndex) {
            const type = (0, get_decorator_target_type_1.getDecoratorTargetType)(target, propertyKey, descriptorOrIndex);
            (0, chai_1.expect)(value).to.be.eq(type);
        };
    };
    it('returns CONSTRUCTOR', () => {
        let Target = class Target {
        };
        Target = __decorate([
            validate(src_1.DecoratorTargetType.CONSTRUCTOR)
        ], Target);
    });
    it('returns INSTANCE', () => {
        class Target {
        }
        const decorator = validate(src_1.DecoratorTargetType.INSTANCE);
        decorator(Target.prototype);
    });
    it('returns STATIC_METHOD', () => {
        class Target {
            static method() {
                /**/
            }
        }
        __decorate([
            validate(src_1.DecoratorTargetType.STATIC_METHOD),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target, "method", null);
    });
    it('returns INSTANCE_METHOD', () => {
        class Target {
            method() {
                /**/
            }
        }
        __decorate([
            validate(src_1.DecoratorTargetType.INSTANCE_METHOD),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
    });
    it('returns STATIC_PROPERTY', () => {
        class Target {
        }
        __decorate([
            validate(src_1.DecoratorTargetType.STATIC_PROPERTY),
            __metadata("design:type", Object)
        ], Target, "prop", void 0);
    });
    it('returns INSTANCE_PROPERTY', () => {
        class Target {
        }
        __decorate([
            validate(src_1.DecoratorTargetType.INSTANCE_PROPERTY),
            __metadata("design:type", Object)
        ], Target.prototype, "prop", void 0);
    });
    it('returns CONSTRUCTOR_PARAMETER', () => {
        let Target = class Target {
            constructor(param) {
                /**/
            }
        };
        Target = __decorate([
            __param(0, validate(src_1.DecoratorTargetType.CONSTRUCTOR_PARAMETER)),
            __metadata("design:paramtypes", [Object])
        ], Target);
    });
    it('returns STATIC_METHOD_PARAMETER', () => {
        class Target {
            static method(param) {
                /**/
            }
        }
        __decorate([
            __param(0, validate(src_1.DecoratorTargetType.STATIC_METHOD_PARAMETER)),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target, "method", null);
    });
    it('returns INSTANCE_METHOD_PARAMETER', () => {
        class Target {
            method(param) {
                /**/
            }
        }
        __decorate([
            __param(0, validate(src_1.DecoratorTargetType.INSTANCE_METHOD_PARAMETER)),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
    });
});
