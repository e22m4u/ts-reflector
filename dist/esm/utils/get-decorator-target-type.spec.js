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
/* eslint @typescript-eslint/no-unused-vars: 0 */
import { expect } from 'chai';
import { getDecoratorTargetType } from './get-decorator-target-type.js';
import { DecoratorTargetType as DTT } from './get-decorator-target-type.js';
describe('getDecoratorTargetType', function () {
    const validate = function (value) {
        return function (target, propertyKey, descriptorOrIndex) {
            const type = getDecoratorTargetType(target, propertyKey, descriptorOrIndex);
            expect(value).to.be.eq(type);
        };
    };
    it('returns CONSTRUCTOR', function () {
        let Target = class Target {
        };
        Target = __decorate([
            validate(DTT.CONSTRUCTOR)
        ], Target);
    });
    it('returns INSTANCE', function () {
        class Target {
        }
        const decorator = validate(DTT.INSTANCE);
        decorator(Target.prototype);
    });
    it('returns STATIC_METHOD', function () {
        class Target {
            static method() {
                /**/
            }
        }
        __decorate([
            validate(DTT.STATIC_METHOD),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target, "method", null);
    });
    it('returns INSTANCE_METHOD', function () {
        class Target {
            method() {
                /**/
            }
        }
        __decorate([
            validate(DTT.INSTANCE_METHOD),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
    });
    it('returns STATIC_PROPERTY', function () {
        class Target {
            static prop;
        }
        __decorate([
            validate(DTT.STATIC_PROPERTY),
            __metadata("design:type", Object)
        ], Target, "prop", void 0);
    });
    it('returns INSTANCE_PROPERTY', function () {
        class Target {
            prop;
        }
        __decorate([
            validate(DTT.INSTANCE_PROPERTY),
            __metadata("design:type", Object)
        ], Target.prototype, "prop", void 0);
    });
    it('returns CONSTRUCTOR_PARAMETER', function () {
        let Target = class Target {
            constructor(param) {
                /**/
            }
        };
        Target = __decorate([
            __param(0, validate(DTT.CONSTRUCTOR_PARAMETER)),
            __metadata("design:paramtypes", [Object])
        ], Target);
    });
    it('returns STATIC_METHOD_PARAMETER', function () {
        class Target {
            static method(param) {
                /**/
            }
        }
        __decorate([
            __param(0, validate(DTT.STATIC_METHOD_PARAMETER)),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target, "method", null);
    });
    it('returns INSTANCE_METHOD_PARAMETER', function () {
        class Target {
            method(param) {
                /**/
            }
        }
        __decorate([
            __param(0, validate(DTT.INSTANCE_METHOD_PARAMETER)),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Target.prototype, "method", null);
    });
});
