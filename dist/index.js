"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var export_1 = require("./export");
var fluence_1 = require("@fluencelabs/fluence");
var fluence_network_environment_1 = require("@fluencelabs/fluence-network-environment");
var http_1 = require("http");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, topic, value, subscribers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fluence_1.createClient(fluence_network_environment_1.krasnodar[1])];
                case 1:
                    client = _a.sent();
                    topic = "myTopic";
                    value = "myValue";
                    // create topic (if not exists) and subscribe on it
                    return [4 /*yield*/, export_1.initTopicAndSubscribe(client, client.relayPeerId, topic, value, client.relayPeerId, null)];
                case 2:
                    // create topic (if not exists) and subscribe on it
                    _a.sent();
                    return [4 /*yield*/, export_1.findSubscribers(client, client.relayPeerId, topic)];
                case 3:
                    subscribers = _a.sent();
                    return [2 /*return*/, subscribers];
            }
        });
    });
}
//create a server object:
http_1.createServer(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var subs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main()];
                case 1:
                    subs = _a.sent();
                    res.write("Hello World!\n"); //write a response to the client
                    res.write(JSON.stringify(subs));
                    res.end(); //end the response
                    return [2 /*return*/];
            }
        });
    });
}).listen(8080); //the server object listens on port 8080
