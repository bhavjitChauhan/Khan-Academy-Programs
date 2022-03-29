var Module = typeof globalThis.__pyodide_module !== "undefined" ? globalThis.__pyodide_module : {};
if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0
}
Module.expectedDataFileDownloads++;
(function () {
    var loadPackage = function (metadata) {
        var PACKAGE_PATH = "";
        if (typeof window === "object") {
            PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/")
        } else if (typeof process === "undefined" && typeof location !== "undefined") {
            PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/")
        }
        var PACKAGE_NAME = "build/distutils.data";
        var REMOTE_PACKAGE_BASE = "distutils.data";
        if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
            Module["locateFile"] = Module["locateFilePackage"];
            err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")
        }
        var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
        var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
        var PACKAGE_UUID = metadata["package_uuid"];
        function fetchRemotePackage(packageName, packageSize, callback, errback) {
            if (typeof process === "object") {
                require("fs").readFile(packageName, (function (err, contents) {
                    if (err) {
                        errback(err)
                    } else {
                        callback(contents.buffer)
                    }
                }
                ));
                return
            }
            if (packageName.includes('distutils.data')) {
                callback(distutils_data)
                return
            }
            var xhr = new XMLHttpRequest;
            xhr.open("GET", packageName, true);
            xhr.responseType = "arraybuffer";
            xhr.onprogress = function (event) {
                var url = packageName;
                var size = packageSize;
                if (event.total)
                    size = event.total;
                if (event.loaded) {
                    if (!xhr.addedTotal) {
                        xhr.addedTotal = true;
                        if (!Module.dataFileDownloads)
                            Module.dataFileDownloads = {};
                        Module.dataFileDownloads[url] = {
                            loaded: event.loaded,
                            total: size
                        }
                    } else {
                        Module.dataFileDownloads[url].loaded = event.loaded
                    }
                    var total = 0;
                    var loaded = 0;
                    var num = 0;
                    for (var download in Module.dataFileDownloads) {
                        var data = Module.dataFileDownloads[download];
                        total += data.total;
                        loaded += data.loaded;
                        num++
                    }
                    total = Math.ceil(total * Module.expectedDataFileDownloads / num);
                    if (Module["setStatus"])
                        Module["setStatus"]("Downloading data... (" + loaded + "/" + total + ")")
                } else if (!Module.dataFileDownloads) {
                    if (Module["setStatus"])
                        Module["setStatus"]("Downloading data...")
                }
            }
                ;
            xhr.onerror = function (event) {
                throw new Error("NetworkError for: " + packageName)
            }
                ;
            xhr.onload = function (event) {
                if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
                    var packageData = xhr.response;
                    callback(packageData)
                } else {
                    throw new Error(xhr.statusText + " : " + xhr.responseURL)
                }
            }
                ;
            xhr.send(null)
        }
        function handleError(error) {
            console.error("package error:", error)
        }
        var fetchedCallback = null;
        var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
        if (!fetched)
            fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (function (data) {
                if (fetchedCallback) {
                    fetchedCallback(data);
                    fetchedCallback = null
                } else {
                    fetched = data
                }
            }
            ), handleError);
        function runWithFS() {
            function assert(check, msg) {
                if (!check)
                    throw msg + (new Error).stack
            }
            Module["FS_createPath"]("/", "lib", true, true);
            Module["FS_createPath"]("/lib", "python3.9", true, true);
            Module["FS_createPath"]("/lib/python3.9", "distutils", true, true);
            Module["FS_createPath"]("/lib/python3.9/distutils", "command", true, true);
            Module["FS_createPath"]("/lib/python3.9/distutils", "tests", true, true);
            function processPackageData(arrayBuffer) {
                assert(arrayBuffer, "Loading data file failed.");
                assert(arrayBuffer instanceof ArrayBuffer, "bad input to processPackageData");
                var byteArray = new Uint8Array(arrayBuffer);
                var curr;
                var compressedData = {
                    data: null,
                    cachedOffset: 511906,
                    cachedIndexes: [-1, -1],
                    cachedChunks: [null, null],
                    offsets: [0, 1431, 2734, 4250, 5542, 6414, 7564, 8576, 9576, 10641, 11802, 13008, 14317, 15328, 16601, 18056, 19142, 20220, 21220, 22456, 23639, 24712, 25994, 27458, 28598, 29994, 31213, 32429, 33346, 34555, 35651, 36646, 37764, 39082, 40370, 41623, 42925, 43507, 44672, 45962, 46937, 48215, 49432, 50810, 52253, 53658, 55082, 56387, 57578, 58971, 59978, 61138, 62337, 63450, 64871, 65933, 66993, 68336, 69669, 70818, 72098, 73504, 74718, 75866, 77174, 78405, 79621, 80936, 82328, 83689, 85055, 86536, 87892, 89111, 90498, 92039, 93033, 94370, 95704, 96996, 98113, 99273, 100316, 101565, 102873, 104136, 105141, 106394, 107435, 108545, 109414, 110537, 111686, 112843, 113969, 114990, 115860, 116835, 117565, 118865, 120050, 121555, 122777, 123711, 124980, 125839, 127284, 128541, 129655, 130740, 131945, 133140, 134342, 135585, 137041, 138156, 139669, 141008, 142168, 143484, 144503, 145041, 146404, 147575, 148912, 150058, 151404, 152459, 153768, 155059, 156385, 157744, 158835, 159862, 160761, 161737, 162620, 163721, 165051, 166111, 167386, 168510, 169714, 171083, 172290, 173183, 174178, 175172, 176122, 177105, 178300, 179550, 180947, 182156, 183563, 184963, 186213, 187475, 188444, 189696, 191055, 192113, 193569, 194905, 196308, 197621, 198848, 200076, 201402, 202470, 203692, 205139, 206382, 207506, 208565, 209908, 211156, 212290, 213653, 214996, 216307, 217742, 219069, 220531, 221915, 223245, 224534, 225849, 227244, 228379, 229490, 230767, 232373, 233837, 235148, 236202, 237432, 238577, 239666, 240886, 241891, 242890, 244238, 245004, 246028, 246947, 248137, 249329, 250383, 251270, 252361, 253518, 254302, 255411, 256303, 257395, 258464, 259673, 260736, 261878, 263020, 263892, 264842, 265921, 267086, 268272, 269342, 270595, 271674, 272773, 273840, 274955, 276028, 277281, 278479, 279598, 280805, 281964, 283073, 284238, 285325, 286634, 287640, 288611, 289718, 291152, 292165, 293176, 294226, 295276, 296495, 297657, 298687, 299790, 300981, 302179, 303372, 304677, 305920, 307201, 308354, 309687, 310892, 312058, 313264, 314464, 315517, 316705, 317938, 319115, 320028, 321108, 322307, 323412, 324519, 325632, 326949, 328041, 329130, 330376, 331111, 332372, 333568, 334610, 335749, 336959, 338332, 339498, 340475, 341736, 342646, 343691, 344726, 345949, 346976, 348040, 349119, 350405, 351597, 352773, 353793, 355006, 356038, 357241, 358367, 359538, 360732, 361669, 362767, 363988, 365202, 366349, 367585, 368734, 369747, 370884, 372141, 373470, 374734, 375902, 377054, 378267, 379564, 380773, 382094, 383424, 384784, 386079, 386987, 388114, 388981, 389977, 390932, 391688, 392902, 394123, 395440, 396651, 397777, 398962, 400263, 401291, 402103, 403438, 404587, 405711, 406689, 407454, 408445, 409519, 410474, 411332, 412555, 413726, 414843, 415796, 416984, 417907, 419155, 420190, 421212, 422408, 423398, 424346, 425521, 426613, 427778, 428896, 429984, 431127, 432286, 433078, 434026, 435111, 436006, 437201, 438232, 439029, 440005, 441094, 441774, 442463, 443105, 444174, 445338, 446551, 447724, 448632, 449893, 450797, 451706, 452474, 452966, 453846, 455036, 456033, 456864, 457849, 459015, 460008, 461103, 461938, 462942, 464119, 465377, 466259, 467328, 468498, 469585, 470755, 471906, 472870, 473826, 475080, 476172, 477237, 478273, 479416, 480629, 481639, 482653, 483713, 484717, 485348, 486501, 487603, 488447, 489164, 490204, 491503, 492324, 493372, 493849, 494897, 496032, 497320, 498505, 499622, 500699, 501119, 502168, 503108, 504294, 505041, 506143, 507359, 508046, 509127, 509880, 510603],
                    sizes: [1431, 1303, 1516, 1292, 872, 1150, 1012, 1e3, 1065, 1161, 1206, 1309, 1011, 1273, 1455, 1086, 1078, 1e3, 1236, 1183, 1073, 1282, 1464, 1140, 1396, 1219, 1216, 917, 1209, 1096, 995, 1118, 1318, 1288, 1253, 1302, 582, 1165, 1290, 975, 1278, 1217, 1378, 1443, 1405, 1424, 1305, 1191, 1393, 1007, 1160, 1199, 1113, 1421, 1062, 1060, 1343, 1333, 1149, 1280, 1406, 1214, 1148, 1308, 1231, 1216, 1315, 1392, 1361, 1366, 1481, 1356, 1219, 1387, 1541, 994, 1337, 1334, 1292, 1117, 1160, 1043, 1249, 1308, 1263, 1005, 1253, 1041, 1110, 869, 1123, 1149, 1157, 1126, 1021, 870, 975, 730, 1300, 1185, 1505, 1222, 934, 1269, 859, 1445, 1257, 1114, 1085, 1205, 1195, 1202, 1243, 1456, 1115, 1513, 1339, 1160, 1316, 1019, 538, 1363, 1171, 1337, 1146, 1346, 1055, 1309, 1291, 1326, 1359, 1091, 1027, 899, 976, 883, 1101, 1330, 1060, 1275, 1124, 1204, 1369, 1207, 893, 995, 994, 950, 983, 1195, 1250, 1397, 1209, 1407, 1400, 1250, 1262, 969, 1252, 1359, 1058, 1456, 1336, 1403, 1313, 1227, 1228, 1326, 1068, 1222, 1447, 1243, 1124, 1059, 1343, 1248, 1134, 1363, 1343, 1311, 1435, 1327, 1462, 1384, 1330, 1289, 1315, 1395, 1135, 1111, 1277, 1606, 1464, 1311, 1054, 1230, 1145, 1089, 1220, 1005, 999, 1348, 766, 1024, 919, 1190, 1192, 1054, 887, 1091, 1157, 784, 1109, 892, 1092, 1069, 1209, 1063, 1142, 1142, 872, 950, 1079, 1165, 1186, 1070, 1253, 1079, 1099, 1067, 1115, 1073, 1253, 1198, 1119, 1207, 1159, 1109, 1165, 1087, 1309, 1006, 971, 1107, 1434, 1013, 1011, 1050, 1050, 1219, 1162, 1030, 1103, 1191, 1198, 1193, 1305, 1243, 1281, 1153, 1333, 1205, 1166, 1206, 1200, 1053, 1188, 1233, 1177, 913, 1080, 1199, 1105, 1107, 1113, 1317, 1092, 1089, 1246, 735, 1261, 1196, 1042, 1139, 1210, 1373, 1166, 977, 1261, 910, 1045, 1035, 1223, 1027, 1064, 1079, 1286, 1192, 1176, 1020, 1213, 1032, 1203, 1126, 1171, 1194, 937, 1098, 1221, 1214, 1147, 1236, 1149, 1013, 1137, 1257, 1329, 1264, 1168, 1152, 1213, 1297, 1209, 1321, 1330, 1360, 1295, 908, 1127, 867, 996, 955, 756, 1214, 1221, 1317, 1211, 1126, 1185, 1301, 1028, 812, 1335, 1149, 1124, 978, 765, 991, 1074, 955, 858, 1223, 1171, 1117, 953, 1188, 923, 1248, 1035, 1022, 1196, 990, 948, 1175, 1092, 1165, 1118, 1088, 1143, 1159, 792, 948, 1085, 895, 1195, 1031, 797, 976, 1089, 680, 689, 642, 1069, 1164, 1213, 1173, 908, 1261, 904, 909, 768, 492, 880, 1190, 997, 831, 985, 1166, 993, 1095, 835, 1004, 1177, 1258, 882, 1069, 1170, 1087, 1170, 1151, 964, 956, 1254, 1092, 1065, 1036, 1143, 1213, 1010, 1014, 1060, 1004, 631, 1153, 1102, 844, 717, 1040, 1299, 821, 1048, 477, 1048, 1135, 1288, 1185, 1117, 1077, 420, 1049, 940, 1186, 747, 1102, 1216, 687, 1081, 753, 723, 1303],
                    successes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                };
                compressedData["data"] = byteArray;
                assert(typeof Module.LZ4 === "object", "LZ4 not present - was your app build with  -s LZ4=1  ?");
                Module.LZ4.loadPackage({
                    metadata: metadata,
                    compressedData: compressedData
                }, true);
                Module["removeRunDependency"]("datafile_build/distutils.data")
            }
            Module["addRunDependency"]("datafile_build/distutils.data");
            if (!Module.preloadResults)
                Module.preloadResults = {};
            Module.preloadResults[PACKAGE_NAME] = {
                fromCache: false
            };
            if (fetched) {
                processPackageData(fetched);
                fetched = null
            } else {
                fetchedCallback = processPackageData
            }
        }
        if (Module["calledRun"]) {
            runWithFS()
        } else {
            if (!Module["preRun"])
                Module["preRun"] = [];
            Module["preRun"].push(runWithFS)
        }
    };
    loadPackage({
        files: [{
            filename: "/lib/python3.9/distutils/README",
            start: 0,
            end: 242,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/__init__.py",
            start: 242,
            end: 478,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/_msvccompiler.py",
            start: 478,
            end: 20485,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/archive_util.py",
            start: 20485,
            end: 29057,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/bcppcompiler.py",
            start: 29057,
            end: 43951,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/ccompiler.py",
            start: 43951,
            end: 91368,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/cmd.py",
            start: 91368,
            end: 109447,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/config.py",
            start: 109447,
            end: 114274,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/core.py",
            start: 114274,
            end: 123150,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/cygwinccompiler.py",
            start: 123150,
            end: 139530,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/debug.py",
            start: 139530,
            end: 139669,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/dep_util.py",
            start: 139669,
            end: 143160,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/dir_util.py",
            start: 143160,
            end: 150938,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/dist.py",
            start: 150938,
            end: 201323,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/errors.py",
            start: 201323,
            end: 204900,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/extension.py",
            start: 204900,
            end: 215415,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/fancy_getopt.py",
            start: 215415,
            end: 233199,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/file_util.py",
            start: 233199,
            end: 241347,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/filelist.py",
            start: 241347,
            end: 254179,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/log.py",
            start: 254179,
            end: 256148,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/msvc9compiler.py",
            start: 256148,
            end: 286601,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/msvccompiler.py",
            start: 286601,
            end: 310141,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/spawn.py",
            start: 310141,
            end: 314533,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/sysconfig.py",
            start: 314533,
            end: 335165,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/text_file.py",
            start: 335165,
            end: 347648,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/unixccompiler.py",
            start: 347648,
            end: 362402,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/util.py",
            start: 362402,
            end: 383315,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/version.py",
            start: 383315,
            end: 395829,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/versionpredicate.py",
            start: 395829,
            end: 400962,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/__init__.py",
            start: 400962,
            end: 401761,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/bdist.py",
            start: 401761,
            end: 407323,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/bdist_dumb.py",
            start: 407323,
            end: 412236,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/bdist_msi.py",
            start: 412236,
            end: 447815,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/bdist_rpm.py",
            start: 447815,
            end: 469352,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/bdist_wininst.py",
            start: 469352,
            end: 485382,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/build.py",
            start: 485382,
            end: 491149,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/build_clib.py",
            start: 491149,
            end: 499171,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/build_ext.py",
            start: 499171,
            end: 530806,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/build_py.py",
            start: 530806,
            end: 547996,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/build_scripts.py",
            start: 547996,
            end: 554228,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/check.py",
            start: 554228,
            end: 559865,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/clean.py",
            start: 559865,
            end: 562641,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/command_template",
            start: 562641,
            end: 563274,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/config.py",
            start: 563274,
            end: 576391,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/install.py",
            start: 576391,
            end: 603196,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/install_data.py",
            start: 603196,
            end: 606018,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/install_egg_info.py",
            start: 606018,
            end: 608621,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/install_headers.py",
            start: 608621,
            end: 609919,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/install_lib.py",
            start: 609919,
            end: 618316,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/install_scripts.py",
            start: 618316,
            end: 620333,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/register.py",
            start: 620333,
            end: 632045,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/sdist.py",
            start: 632045,
            end: 651050,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/command/upload.py",
            start: 651050,
            end: 658647,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/Setup.sample",
            start: 658647,
            end: 660896,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/__init__.py",
            start: 660896,
            end: 662240,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/includetest.rst",
            start: 662240,
            end: 662265,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/support.py",
            start: 662265,
            end: 668743,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_archive_util.py",
            start: 668743,
            end: 683044,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_bdist.py",
            start: 683044,
            end: 684937,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_bdist_dumb.py",
            start: 684937,
            end: 687842,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_bdist_msi.py",
            start: 687842,
            end: 688645,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_bdist_rpm.py",
            start: 688645,
            end: 693653,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_bdist_wininst.py",
            start: 693653,
            end: 695043,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_build.py",
            start: 695043,
            end: 697008,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_build_clib.py",
            start: 697008,
            end: 701639,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_build_ext.py",
            start: 701639,
            end: 722272,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_build_py.py",
            start: 722272,
            end: 728607,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_build_scripts.py",
            start: 728607,
            end: 732200,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_check.py",
            start: 732200,
            end: 737911,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_clean.py",
            start: 737911,
            end: 739352,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_cmd.py",
            start: 739352,
            end: 743187,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_config.py",
            start: 743187,
            end: 747079,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_config_cmd.py",
            start: 747079,
            end: 750102,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_core.py",
            start: 750102,
            end: 754179,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_cygwinccompiler.py",
            start: 754179,
            end: 759815,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_dep_util.py",
            start: 759815,
            end: 762635,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_dir_util.py",
            start: 762635,
            end: 767289,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_dist.py",
            start: 767289,
            end: 786369,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_extension.py",
            start: 786369,
            end: 789137,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_file_util.py",
            start: 789137,
            end: 793550,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_filelist.py",
            start: 793550,
            end: 805025,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_install.py",
            start: 805025,
            end: 813637,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_install_data.py",
            start: 813637,
            end: 816214,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_install_headers.py",
            start: 816214,
            end: 817452,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_install_lib.py",
            start: 817452,
            end: 821426,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_install_scripts.py",
            start: 821426,
            end: 824051,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_log.py",
            start: 824051,
            end: 825915,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_msvc9compiler.py",
            start: 825915,
            end: 831953,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_msvccompiler.py",
            start: 831953,
            end: 834798,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_register.py",
            start: 834798,
            end: 844563,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_sdist.py",
            start: 844563,
            end: 861610,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_spawn.py",
            start: 861610,
            end: 867070,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_sysconfig.py",
            start: 867070,
            end: 878115,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_text_file.py",
            start: 878115,
            end: 881551,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_unixccompiler.py",
            start: 881551,
            end: 886179,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_upload.py",
            start: 886179,
            end: 893318,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_util.py",
            start: 893318,
            end: 904890,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_version.py",
            start: 904890,
            end: 908340,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/test_versionpredicate.py",
            start: 908340,
            end: 908620,
            audio: 0
        }, {
            filename: "/lib/python3.9/distutils/tests/xxmodule.c",
            start: 908620,
            end: 921535,
            audio: 0
        }],
        remote_package_size: 516002,
        package_uuid: "1f6ab67c-38cc-4639-b35f-5ea6ac86747e"
    })
}
)();



!function (global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? factory(exports) : "function" == typeof define && define.amd ? define(["exports"], factory) : factory((global = "undefined" != typeof globalThis ? globalThis : global || self).loadPyodide = {})
}(this, (function (exports) {
    "use strict";
    let Module = {};
    function setStandardStreams(stdin, stdout, stderr) {
        stdout && (Module.print = stdout),
            stderr && (Module.printErr = stderr),
            stdin && Module.preRun.push((function () {
                Module.FS.init(function (stdin) {
                    const encoder = new TextEncoder;
                    let input = new Uint8Array(0)
                        , inputIndex = -1;
                    function stdinWrapper() {
                        try {
                            if (-1 === inputIndex) {
                                let text = stdin();
                                if (null == text)
                                    return null;
                                if ("string" != typeof text)
                                    throw new TypeError(`Expected stdin to return string, null, or undefined, got type ${typeof text}.`);
                                text.endsWith("\n") || (text += "\n"),
                                    input = encoder.encode(text),
                                    inputIndex = 0
                            }
                            if (inputIndex < input.length) {
                                let character = input[inputIndex];
                                return inputIndex++,
                                    character
                            }
                            return inputIndex = -1,
                                null
                        } catch (e) {
                            throw console.error("Error thrown in stdin:"),
                            console.error(e),
                            e
                        }
                    }
                    return stdinWrapper
                }(stdin), null, null)
            }
            ))
    }
    Module.noImageDecoding = !0,
        Module.noAudioDecoding = !0,
        Module.noWasmDecoding = !1,
        Module.preloadedWasm = {},
        Module.preRun = [];
    const IN_NODE = "undefined" != typeof process && process.release && "node" === process.release.name && void 0 === process.browser;
    let baseURL;
    const package_uri_regexp = /^.*?([^\/]*)\.js$/;
    function _uri_to_package_name(package_uri) {
        let match = package_uri_regexp.exec(package_uri);
        if (match)
            return match[1].toLowerCase()
    }
    let loadScript;
    if (globalThis.document)
        loadScript = async url => await import(url);
    else if (globalThis.importScripts)
        loadScript = async url => {
            globalThis.importScripts(url)
        }
            ;
    else {
        if (!IN_NODE)
            throw new Error("Cannot determine runtime environment");
        {
            const pathPromise = import("path").then((M => M.default))
                , fetchPromise = import("node-fetch").then((M => M.default))
                , vmPromise = import("vm").then((M => M.default));
            loadScript = async url => {
                if (url.includes("://")) {
                    const fetch = await fetchPromise;
                    (await vmPromise).runInThisContext(await (await fetch(url)).text())
                } else {
                    const path = await pathPromise;
                    await import(path.resolve(url))
                }
            }
        }
    }
    function addPackageToLoad(name, toLoad) {
        if (name = name.toLowerCase(),
            !toLoad.has(name) && (toLoad.set(name, "default channel"),
                void 0 === loadedPackages[name]))
            for (let dep_name of Module.packages[name].depends)
                addPackageToLoad(dep_name, toLoad)
    }
    function recursiveDependencies(names, _messageCallback, errorCallback, sharedLibsOnly) {
        const toLoad = new Map;
        for (let name of names) {
            const pkgname = _uri_to_package_name(name);
            toLoad.has(pkgname) && toLoad.get(pkgname) !== name ? errorCallback(`Loading same package ${pkgname} from ${name} and ${toLoad.get(pkgname)}`) : void 0 === pkgname ? (name = name.toLowerCase(),
                name in Module.packages ? addPackageToLoad(name, toLoad) : errorCallback(`Skipping unknown package '${name}'`)) : toLoad.set(pkgname, name)
        }
        if (sharedLibsOnly) {
            let onlySharedLibs = new Map;
            for (let c of toLoad) {
                let name = c[0];
                Module.packages[name].shared_library && onlySharedLibs.set(name, toLoad.get(name))
            }
            return onlySharedLibs
        }
        return toLoad
    }
    function waitRunDependency() {
        const promise = new Promise((r => {
            Module.monitorRunDependencies = n => {
                0 === n && r()
            }
        }
        ));
        return Module.addRunDependency("dummy"),
            Module.removeRunDependency("dummy"),
            promise
    }
    async function _loadPackage(names, messageCallback, errorCallback) {
        let toLoad = recursiveDependencies(names, 0, errorCallback);
        if (Module.locateFile_packagesToLoad = toLoad,
            0 === toLoad.size)
            return Promise.resolve("No new packages to load");
        messageCallback(`Loading ${Array.from(toLoad.keys()).join(", ")}`);
        let scriptPromises = [];
        for (let [pkg, uri] of toLoad) {
            let loaded = loadedPackages[pkg];
            if (void 0 !== loaded) {
                if (loaded === uri || "default channel" === uri) {
                    messageCallback(`${pkg} already loaded from ${loaded}`);
                    continue
                }
                errorCallback(`URI mismatch, attempting to load package ${pkg} from ${uri} while it is already loaded from ${loaded}. To override a dependency, load the custom package first.`);
                continue
            }
            let pkgname = Module.packages[pkg] && Module.packages[pkg].name || pkg
                , scriptSrc = "default channel" === uri ? `${baseURL}${pkgname}.js` : uri;
            messageCallback(`Loading ${pkg} from ${scriptSrc}`),
                console.log('scriptSrc', scriptSrc)
            scriptPromises.push(loadScript(scriptSrc).catch((e => {
                errorCallback(`Couldn't load package from URL ${scriptSrc}`, e),
                    toLoad.delete(pkg)
            }
            )))
        }
        try {
            await Promise.all(scriptPromises).then(waitRunDependency)
        } finally {
            delete Module.monitorRunDependencies
        }
        let resolveMsg, packageList = [];
        for (let [pkg, uri] of toLoad)
            loadedPackages[pkg] = uri,
                packageList.push(pkg);
        if (packageList.length > 0) {
            resolveMsg = `Loaded ${packageList.join(", ")}`
        } else
            resolveMsg = "No packages loaded";
        Module.reportUndefinedSymbols(),
            messageCallback(resolveMsg),
            Module.importlib.invalidate_caches()
    }
    Module.locateFile = function (path) {
        let pkg = path.replace(/\.data$/, "");
        const toLoad = Module.locateFile_packagesToLoad;
        if (toLoad && toLoad.has(pkg)) {
            let package_uri = toLoad.get(pkg);
            if ("default channel" != package_uri)
                return package_uri.replace(/\.js$/, ".data")
        }
        return baseURL + path
    }
        ;
    let _package_lock = Promise.resolve();
    let sharedLibraryWasmPlugin, origWasmPlugin, wasmPluginIndex, loadedPackages = {};
    function useSharedLibraryWasmPlugin() {
        sharedLibraryWasmPlugin || function () {
            for (let p in Module.preloadPlugins)
                if (Module.preloadPlugins[p].canHandle("test.so")) {
                    origWasmPlugin = Module.preloadPlugins[p],
                        wasmPluginIndex = p;
                    break
                }
            sharedLibraryWasmPlugin = {
                canHandle: origWasmPlugin.canHandle,
                handle(byteArray, name, onload, onerror) {
                    origWasmPlugin.handle(byteArray, name, onload, onerror),
                        origWasmPlugin.asyncWasmLoadPromise = (async () => {
                            await origWasmPlugin.asyncWasmLoadPromise,
                                Module.loadDynamicLibrary(name, {
                                    global: !0,
                                    nodelete: !0
                                })
                        }
                        )()
                }
            }
        }(),
            Module.preloadPlugins[wasmPluginIndex] = sharedLibraryWasmPlugin
    }
    function restoreOrigWasmPlugin() {
        Module.preloadPlugins[wasmPluginIndex] = origWasmPlugin
    }
    async function loadPackage(names, messageCallback, errorCallback) {
        if (Module.isPyProxy(names)) {
            let temp;
            try {
                temp = names.toJs()
            } finally {
                names.destroy()
            }
            names = temp
        }
        Array.isArray(names) || (names = [names]);
        let sharedLibraryNames = [];
        try {
            let sharedLibraryPackagesToLoad = recursiveDependencies(names, 0, errorCallback, !0);
            for (let pkg of sharedLibraryPackagesToLoad)
                sharedLibraryNames.push(pkg[0])
        } catch (e) { }
        let releaseLock = await async function () {
            let releaseLock, old_lock = _package_lock;
            return _package_lock = new Promise((resolve => releaseLock = resolve)),
                await old_lock,
                releaseLock
        }();
        try {
            useSharedLibraryWasmPlugin(),
                await _loadPackage(sharedLibraryNames, messageCallback || console.log, errorCallback || console.error),
                restoreOrigWasmPlugin(),
                await _loadPackage(names, messageCallback || console.log, errorCallback || console.error)
        } finally {
            restoreOrigWasmPlugin(),
                releaseLock()
        }
    }
    function isPyProxy(jsobj) {
        return !!jsobj && void 0 !== jsobj.$$ && "PyProxy" === jsobj.$$.type
    }
    Module.isPyProxy = isPyProxy,
        globalThis.FinalizationRegistry ? Module.finalizationRegistry = new FinalizationRegistry((([ptr, cache]) => {
            cache.leaked = !0,
                pyproxy_decref_cache(cache);
            try {
                Module._Py_DecRef(ptr)
            } catch (e) {
                Module.fatal_error(e)
            }
        }
        )) : Module.finalizationRegistry = {
            register() { },
            unregister() { }
        };
    let trace_pyproxy_alloc, trace_pyproxy_dealloc, pyproxy_alloc_map = new Map;
    function _getPtr(jsobj) {
        let ptr = jsobj.$$.ptr;
        if (null === ptr)
            throw new Error(jsobj.$$.destroyed_msg);
        return ptr
    }
    Module.pyproxy_alloc_map = pyproxy_alloc_map,
        Module.enable_pyproxy_allocation_tracing = function () {
            trace_pyproxy_alloc = function (proxy) {
                pyproxy_alloc_map.set(proxy, Error().stack)
            }
                ,
                trace_pyproxy_dealloc = function (proxy) {
                    pyproxy_alloc_map.delete(proxy)
                }
        }
        ,
        Module.disable_pyproxy_allocation_tracing = function () {
            trace_pyproxy_alloc = function (proxy) { }
                ,
                trace_pyproxy_dealloc = function (proxy) { }
        }
        ,
        Module.disable_pyproxy_allocation_tracing(),
        Module.pyproxy_new = function (ptrobj, cache) {
            let target, flags = Module._pyproxy_getflags(ptrobj), cls = Module.getPyProxyClass(flags);
            if (256 & flags ? (target = Reflect.construct(Function, [], cls),
                delete target.length,
                delete target.name,
                target.prototype = void 0) : target = Object.create(cls.prototype),
                !cache) {
                cache = {
                    cacheId: Module.hiwire.new_value(new Map),
                    refcnt: 0
                }
            }
            cache.refcnt++,
                Object.defineProperty(target, "$$", {
                    value: {
                        ptr: ptrobj,
                        type: "PyProxy",
                        cache: cache
                    }
                }),
                Module._Py_IncRef(ptrobj);
            let proxy = new Proxy(target, PyProxyHandlers);
            return trace_pyproxy_alloc(proxy),
                Module.finalizationRegistry.register(proxy, [ptrobj, cache], proxy),
                proxy
        }
        ;
    let pyproxyClassMap = new Map;
    Module.getPyProxyClass = function (flags) {
        let result = pyproxyClassMap.get(flags);
        if (result)
            return result;
        let descriptors = {};
        for (let [feature_flag, methods] of [[1, PyProxyLengthMethods], [2, PyProxyGetItemMethods], [4, PyProxySetItemMethods], [8, PyProxyContainsMethods], [16, PyProxyIterableMethods], [32, PyProxyIteratorMethods], [64, PyProxyAwaitableMethods], [128, PyProxyBufferMethods], [256, PyProxyCallableMethods]])
            flags & feature_flag && Object.assign(descriptors, Object.getOwnPropertyDescriptors(methods.prototype));
        descriptors.constructor = Object.getOwnPropertyDescriptor(PyProxyClass.prototype, "constructor"),
            Object.assign(descriptors, Object.getOwnPropertyDescriptors({
                $$flags: flags
            }));
        let new_proto = Object.create(PyProxyClass.prototype, descriptors);
        function NewPyProxyClass() { }
        return NewPyProxyClass.prototype = new_proto,
            pyproxyClassMap.set(flags, NewPyProxyClass),
            NewPyProxyClass
    }
        ,
        Module.PyProxy_getPtr = _getPtr;
    function pyproxy_decref_cache(cache) {
        if (cache && (cache.refcnt--,
            0 === cache.refcnt)) {
            let cache_map = Module.hiwire.pop_value(cache.cacheId);
            for (let proxy_id of cache_map.values()) {
                const cache_entry = Module.hiwire.pop_value(proxy_id);
                cache.leaked || Module.pyproxy_destroy(cache_entry, "This borrowed attribute proxy was automatically destroyed in the process of destroying the proxy it was borrowed from. Try using the 'copy' method.")
            }
        }
    }
    Module.pyproxy_destroy = function (proxy, destroyed_msg) {
        if (null === proxy.$$.ptr)
            return;
        let ptrobj = _getPtr(proxy);
        Module.finalizationRegistry.unregister(proxy),
            destroyed_msg = destroyed_msg || "Object has already been destroyed";
        let proxy_repr, proxy_type = proxy.type;
        try {
            proxy_repr = proxy.toString()
        } catch (e) {
            if (e.pyodide_fatal_error)
                throw e
        }
        proxy.$$.ptr = null,
            destroyed_msg += `\nThe object was of type "${proxy_type}" and `,
            destroyed_msg += proxy_repr ? `had repr "${proxy_repr}"` : "an error was raised when trying to generate its repr",
            proxy.$$.destroyed_msg = destroyed_msg,
            pyproxy_decref_cache(proxy.$$.cache);
        try {
            Module._Py_DecRef(ptrobj),
                trace_pyproxy_dealloc(proxy)
        } catch (e) {
            Module.fatal_error(e)
        }
    }
        ,
        Module.callPyObjectKwargs = function (ptrobj, ...jsargs) {
            let kwargs = jsargs.pop()
                , num_pos_args = jsargs.length
                , kwargs_names = Object.keys(kwargs)
                , kwargs_values = Object.values(kwargs)
                , num_kwargs = kwargs_names.length;
            jsargs.push(...kwargs_values);
            let idresult, idargs = Module.hiwire.new_value(jsargs), idkwnames = Module.hiwire.new_value(kwargs_names);
            try {
                idresult = Module.__pyproxy_apply(ptrobj, idargs, num_pos_args, idkwnames, num_kwargs)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(idargs),
                    Module.hiwire.decref(idkwnames)
            }
            return 0 === idresult && Module._pythonexc2js(),
                Module.hiwire.pop_value(idresult)
        }
        ,
        Module.callPyObject = function (ptrobj, ...jsargs) {
            return Module.callPyObjectKwargs(ptrobj, ...jsargs, {})
        }
        ;
    class PyProxyClass {
        constructor() {
            throw new TypeError("PyProxy is not a constructor")
        }
        get [Symbol.toStringTag]() {
            return "PyProxy"
        }
        get type() {
            let ptrobj = _getPtr(this);
            return Module.hiwire.pop_value(Module.__pyproxy_type(ptrobj))
        }
        toString() {
            let jsref_repr, ptrobj = _getPtr(this);
            try {
                jsref_repr = Module.__pyproxy_repr(ptrobj)
            } catch (e) {
                Module.fatal_error(e)
            }
            return 0 === jsref_repr && Module._pythonexc2js(),
                Module.hiwire.pop_value(jsref_repr)
        }
        destroy(destroyed_msg) {
            Module.pyproxy_destroy(this, destroyed_msg)
        }
        copy() {
            let ptrobj = _getPtr(this);
            return Module.pyproxy_new(ptrobj, this.$$.cache)
        }
        toJs({ depth: depth = -1, pyproxies: pyproxies, create_pyproxies: create_pyproxies = !0, dict_converter: dict_converter } = {}) {
            let idresult, proxies_id, ptrobj = _getPtr(this), dict_converter_id = 0;
            proxies_id = create_pyproxies ? pyproxies ? Module.hiwire.new_value(pyproxies) : Module.hiwire.new_value([]) : 0,
                dict_converter && (dict_converter_id = Module.hiwire.new_value(dict_converter));
            try {
                idresult = Module._python2js_custom_dict_converter(ptrobj, depth, proxies_id, dict_converter_id)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(proxies_id),
                    Module.hiwire.decref(dict_converter_id)
            }
            return 0 === idresult && Module._pythonexc2js(),
                Module.hiwire.pop_value(idresult)
        }
        supportsLength() {
            return !!(1 & this.$$flags)
        }
        supportsGet() {
            return !!(2 & this.$$flags)
        }
        supportsSet() {
            return !!(4 & this.$$flags)
        }
        supportsHas() {
            return !!(8 & this.$$flags)
        }
        isIterable() {
            return !!(48 & this.$$flags)
        }
        isIterator() {
            return !!(32 & this.$$flags)
        }
        isAwaitable() {
            return !!(64 & this.$$flags)
        }
        isBuffer() {
            return !!(128 & this.$$flags)
        }
        isCallable() {
            return !!(256 & this.$$flags)
        }
    }
    class PyProxyLengthMethods {
        get length() {
            let length, ptrobj = _getPtr(this);
            try {
                length = Module._PyObject_Size(ptrobj)
            } catch (e) {
                Module.fatal_error(e)
            }
            return -1 === length && Module._pythonexc2js(),
                length
        }
    }
    class PyProxyGetItemMethods {
        get(key) {
            let idresult, ptrobj = _getPtr(this), idkey = Module.hiwire.new_value(key);
            try {
                idresult = Module.__pyproxy_getitem(ptrobj, idkey)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(idkey)
            }
            if (0 === idresult) {
                if (!Module._PyErr_Occurred())
                    return;
                Module._pythonexc2js()
            }
            return Module.hiwire.pop_value(idresult)
        }
    }
    class PyProxySetItemMethods {
        set(key, value) {
            let errcode, ptrobj = _getPtr(this), idkey = Module.hiwire.new_value(key), idval = Module.hiwire.new_value(value);
            try {
                errcode = Module.__pyproxy_setitem(ptrobj, idkey, idval)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(idkey),
                    Module.hiwire.decref(idval)
            }
            -1 === errcode && Module._pythonexc2js()
        }
        delete(key) {
            let errcode, ptrobj = _getPtr(this), idkey = Module.hiwire.new_value(key);
            try {
                errcode = Module.__pyproxy_delitem(ptrobj, idkey)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(idkey)
            }
            -1 === errcode && Module._pythonexc2js()
        }
    }
    class PyProxyContainsMethods {
        has(key) {
            let result, ptrobj = _getPtr(this), idkey = Module.hiwire.new_value(key);
            try {
                result = Module.__pyproxy_contains(ptrobj, idkey)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(idkey)
            }
            return -1 === result && Module._pythonexc2js(),
                1 === result
        }
    }
    class PyProxyIterableMethods {
        [Symbol.iterator]() {
            let iterptr, ptrobj = _getPtr(this), token = {};
            try {
                iterptr = Module._PyObject_GetIter(ptrobj)
            } catch (e) {
                Module.fatal_error(e)
            }
            0 === iterptr && Module._pythonexc2js();
            let result = function* (iterptr, token) {
                try {
                    let item;
                    for (; item = Module.__pyproxy_iter_next(iterptr);)
                        yield Module.hiwire.pop_value(item)
                } catch (e) {
                    Module.fatal_error(e)
                } finally {
                    Module.finalizationRegistry.unregister(token),
                        Module._Py_DecRef(iterptr)
                }
                Module._PyErr_Occurred() && Module._pythonexc2js()
            }(iterptr, token);
            return Module.finalizationRegistry.register(result, [iterptr, void 0], token),
                result
        }
    }
    class PyProxyIteratorMethods {
        [Symbol.iterator]() {
            return this
        }
        next(arg) {
            let idresult, done, idarg = Module.hiwire.new_value(arg);
            try {
                idresult = Module.__pyproxyGen_Send(_getPtr(this), idarg),
                    done = 0 === idresult,
                    done && (idresult = Module.__pyproxyGen_FetchStopIterationValue())
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(idarg)
            }
            return done && 0 === idresult && Module._pythonexc2js(),
            {
                done: done,
                value: Module.hiwire.pop_value(idresult)
            }
        }
    }
    let PyProxyHandlers = {
        isExtensible: () => !0,
        has: (jsobj, jskey) => !!Reflect.has(jsobj, jskey) || "symbol" != typeof jskey && (jskey.startsWith("$") && (jskey = jskey.slice(1)),
            function (jsobj, jskey) {
                let result, ptrobj = _getPtr(jsobj), idkey = Module.hiwire.new_value(jskey);
                try {
                    result = Module.__pyproxy_hasattr(ptrobj, idkey)
                } catch (e) {
                    Module.fatal_error(e)
                } finally {
                    Module.hiwire.decref(idkey)
                }
                return -1 === result && Module._pythonexc2js(),
                    0 !== result
            }(jsobj, jskey)),
        get(jsobj, jskey) {
            if (jskey in jsobj || "symbol" == typeof jskey)
                return Reflect.get(jsobj, jskey);
            jskey.startsWith("$") && (jskey = jskey.slice(1));
            let idresult = function (jsobj, jskey) {
                let idresult, ptrobj = _getPtr(jsobj), idkey = Module.hiwire.new_value(jskey), cacheId = jsobj.$$.cache.cacheId;
                try {
                    idresult = Module.__pyproxy_getattr(ptrobj, idkey, cacheId)
                } catch (e) {
                    Module.fatal_error(e)
                } finally {
                    Module.hiwire.decref(idkey)
                }
                return 0 === idresult && Module._PyErr_Occurred() && Module._pythonexc2js(),
                    idresult
            }(jsobj, jskey);
            return 0 !== idresult ? Module.hiwire.pop_value(idresult) : void 0
        },
        set(jsobj, jskey, jsval) {
            let descr = Object.getOwnPropertyDescriptor(jsobj, jskey);
            if (descr && !descr.writable)
                throw new TypeError(`Cannot set read only field '${jskey}'`);
            return "symbol" == typeof jskey ? Reflect.set(jsobj, jskey, jsval) : (jskey.startsWith("$") && (jskey = jskey.slice(1)),
                function (jsobj, jskey, jsval) {
                    let errcode, ptrobj = _getPtr(jsobj), idkey = Module.hiwire.new_value(jskey), idval = Module.hiwire.new_value(jsval);
                    try {
                        errcode = Module.__pyproxy_setattr(ptrobj, idkey, idval)
                    } catch (e) {
                        Module.fatal_error(e)
                    } finally {
                        Module.hiwire.decref(idkey),
                            Module.hiwire.decref(idval)
                    }
                    -1 === errcode && Module._pythonexc2js()
                }(jsobj, jskey, jsval),
                !0)
        },
        deleteProperty(jsobj, jskey) {
            let descr = Object.getOwnPropertyDescriptor(jsobj, jskey);
            if (descr && !descr.writable)
                throw new TypeError(`Cannot delete read only field '${jskey}'`);
            return "symbol" == typeof jskey ? Reflect.deleteProperty(jsobj, jskey) : (jskey.startsWith("$") && (jskey = jskey.slice(1)),
                function (jsobj, jskey) {
                    let errcode, ptrobj = _getPtr(jsobj), idkey = Module.hiwire.new_value(jskey);
                    try {
                        errcode = Module.__pyproxy_delattr(ptrobj, idkey)
                    } catch (e) {
                        Module.fatal_error(e)
                    } finally {
                        Module.hiwire.decref(idkey)
                    }
                    -1 === errcode && Module._pythonexc2js()
                }(jsobj, jskey),
                !descr || descr.configurable)
        },
        ownKeys(jsobj) {
            let idresult, ptrobj = _getPtr(jsobj);
            try {
                idresult = Module.__pyproxy_ownKeys(ptrobj)
            } catch (e) {
                Module.fatal_error(e)
            }
            0 === idresult && Module._pythonexc2js();
            let result = Module.hiwire.pop_value(idresult);
            return result.push(...Reflect.ownKeys(jsobj)),
                result
        },
        apply: (jsobj, jsthis, jsargs) => jsobj.apply(jsthis, jsargs)
    };
    class PyProxyAwaitableMethods {
        _ensure_future() {
            if (this.$$.promise)
                return this.$$.promise;
            let resolveHandle, rejectHandle, errcode, ptrobj = _getPtr(this), promise = new Promise(((resolve, reject) => {
                resolveHandle = resolve,
                    rejectHandle = reject
            }
            )), resolve_handle_id = Module.hiwire.new_value(resolveHandle), reject_handle_id = Module.hiwire.new_value(rejectHandle);
            try {
                errcode = Module.__pyproxy_ensure_future(ptrobj, resolve_handle_id, reject_handle_id)
            } catch (e) {
                Module.fatal_error(e)
            } finally {
                Module.hiwire.decref(reject_handle_id),
                    Module.hiwire.decref(resolve_handle_id)
            }
            return -1 === errcode && Module._pythonexc2js(),
                this.$$.promise = promise,
                this.destroy(),
                promise
        }
        then(onFulfilled, onRejected) {
            return this._ensure_future().then(onFulfilled, onRejected)
        }
        catch(onRejected) {
            return this._ensure_future().catch(onRejected)
        }
        finally(onFinally) {
            return this._ensure_future().finally(onFinally)
        }
    }
    class PyProxyCallableMethods {
        apply(jsthis, jsargs) {
            return Module.callPyObject(_getPtr(this), ...jsargs)
        }
        call(jsthis, ...jsargs) {
            return Module.callPyObject(_getPtr(this), ...jsargs)
        }
        callKwargs(...jsargs) {
            if (0 === jsargs.length)
                throw new TypeError("callKwargs requires at least one argument (the key word argument object)");
            let kwargs = jsargs[jsargs.length - 1];
            if (void 0 !== kwargs.constructor && "Object" !== kwargs.constructor.name)
                throw new TypeError("kwargs argument is not an object");
            return Module.callPyObjectKwargs(_getPtr(this), ...jsargs)
        }
    }
    PyProxyCallableMethods.prototype.prototype = Function.prototype;
    let type_to_array_map = new Map([["i8", Int8Array], ["u8", Uint8Array], ["u8clamped", Uint8ClampedArray], ["i16", Int16Array], ["u16", Uint16Array], ["i32", Int32Array], ["u32", Uint32Array], ["i32", Int32Array], ["u32", Uint32Array], ["i64", globalThis.BigInt64Array], ["u64", globalThis.BigUint64Array], ["f32", Float32Array], ["f64", Float64Array], ["dataview", DataView]]);
    class PyProxyBufferMethods {
        getBuffer(type) {
            let ArrayType;
            if (type && (ArrayType = type_to_array_map.get(type),
                void 0 === ArrayType))
                throw new Error(`Unknown type ${type}`);
            let errcode, HEAPU32 = Module.HEAPU32, orig_stack_ptr = Module.stackSave(), buffer_struct_ptr = Module.stackAlloc(HEAPU32[0 + (Module._buffer_struct_size >> 2)]), this_ptr = _getPtr(this);
            try {
                errcode = Module.__pyproxy_get_buffer(buffer_struct_ptr, this_ptr)
            } catch (e) {
                Module.fatal_error(e)
            }
            -1 === errcode && Module._pythonexc2js();
            let startByteOffset = HEAPU32[0 + (buffer_struct_ptr >> 2)]
                , minByteOffset = HEAPU32[1 + (buffer_struct_ptr >> 2)]
                , maxByteOffset = HEAPU32[2 + (buffer_struct_ptr >> 2)]
                , readonly = !!HEAPU32[3 + (buffer_struct_ptr >> 2)]
                , format_ptr = HEAPU32[4 + (buffer_struct_ptr >> 2)]
                , itemsize = HEAPU32[5 + (buffer_struct_ptr >> 2)]
                , shape = Module.hiwire.pop_value(HEAPU32[6 + (buffer_struct_ptr >> 2)])
                , strides = Module.hiwire.pop_value(HEAPU32[7 + (buffer_struct_ptr >> 2)])
                , view_ptr = HEAPU32[8 + (buffer_struct_ptr >> 2)]
                , c_contiguous = !!HEAPU32[9 + (buffer_struct_ptr >> 2)]
                , f_contiguous = !!HEAPU32[10 + (buffer_struct_ptr >> 2)]
                , format = Module.UTF8ToString(format_ptr);
            Module.stackRestore(orig_stack_ptr);
            let success = !1;
            try {
                let bigEndian = !1;
                void 0 === ArrayType && ([ArrayType, bigEndian] = Module.processBufferFormatString(format, " In this case, you can pass an explicit type argument."));
                let alignment = parseInt(ArrayType.name.replace(/[^0-9]/g, "")) / 8 || 1;
                if (bigEndian && alignment > 1)
                    throw new Error("Javascript has no native support for big endian buffers. In this case, you can pass an explicit type argument. For instance, `getBuffer('dataview')` will return a `DataView`which has native support for reading big endian data. Alternatively, toJs will automatically convert the buffer to little endian.");
                let numBytes = maxByteOffset - minByteOffset;
                if (0 !== numBytes && (startByteOffset % alignment != 0 || minByteOffset % alignment != 0 || maxByteOffset % alignment != 0))
                    throw new Error(`Buffer does not have valid alignment for a ${ArrayType.name}`);
                let data, numEntries = numBytes / alignment, offset = (startByteOffset - minByteOffset) / alignment;
                data = 0 === numBytes ? new ArrayType : new ArrayType(HEAPU32.buffer, minByteOffset, numEntries);
                for (let i of strides.keys())
                    strides[i] /= alignment;
                return success = !0,
                    Object.create(PyBuffer.prototype, Object.getOwnPropertyDescriptors({
                        offset: offset,
                        readonly: readonly,
                        format: format,
                        itemsize: itemsize,
                        ndim: shape.length,
                        nbytes: numBytes,
                        shape: shape,
                        strides: strides,
                        data: data,
                        c_contiguous: c_contiguous,
                        f_contiguous: f_contiguous,
                        _view_ptr: view_ptr,
                        _released: !1
                    }))
            } finally {
                if (!success)
                    try {
                        Module._PyBuffer_Release(view_ptr),
                            Module._PyMem_Free(view_ptr)
                    } catch (e) {
                        Module.fatal_error(e)
                    }
            }
        }
    }
    class PyBuffer {
        constructor() {
            throw this.offset,
            this.readonly,
            this.format,
            this.itemsize,
            this.ndim,
            this.nbytes,
            this.shape,
            this.strides,
            this.data,
            this.c_contiguous,
            this.f_contiguous,
            new TypeError("PyBuffer is not a constructor")
        }
        release() {
            if (!this._released) {
                try {
                    Module._PyBuffer_Release(this._view_ptr),
                        Module._PyMem_Free(this._view_ptr)
                } catch (e) {
                    Module.fatal_error(e)
                }
                this._released = !0,
                    this.data = null
            }
        }
    }
    let pyodide_py = {}
        , globals = {};
    class PythonError {
        constructor() {
            this.message
        }
    }
    function runPython(code, globals = Module.globals) {
        return Module.pyodide_py.eval_code(code, globals)
    }
    async function loadPackagesFromImports(code, messageCallback, errorCallback) {
        let imports, pyimports = Module.pyodide_py.find_imports(code);
        try {
            imports = pyimports.toJs()
        } finally {
            pyimports.destroy()
        }
        if (0 === imports.length)
            return;
        let packageNames = Module._import_name_to_package_name
            , packages = new Set;
        for (let name of imports)
            packageNames.has(name) && packages.add(packageNames.get(name));
        packages.size && await loadPackage(Array.from(packages), messageCallback, errorCallback)
    }
    async function runPythonAsync(code, globals = Module.globals) {
        return await Module.pyodide_py.eval_code_async(code, globals)
    }
    function registerJsModule(name, module) {
        Module.pyodide_py.register_js_module(name, module)
    }
    function registerComlink(Comlink) {
        Module._Comlink = Comlink
    }
    function unregisterJsModule(name) {
        Module.pyodide_py.unregister_js_module(name)
    }
    function toPy(obj, { depth: depth = -1 } = {}) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
            case "bigint":
            case "undefined":
                return obj
        }
        if (!obj || Module.isPyProxy(obj))
            return obj;
        let obj_id = 0
            , py_result = 0
            , result = 0;
        try {
            obj_id = Module.hiwire.new_value(obj);
            try {
                py_result = Module.js2python_convert(obj_id, new Map, depth)
            } catch (e) {
                throw e instanceof Module._PropagatePythonError && Module._pythonexc2js(),
                e
            }
            if (Module._JsProxy_Check(py_result))
                return obj;
            result = Module._python2js(py_result),
                0 === result && Module._pythonexc2js()
        } finally {
            Module.hiwire.decref(obj_id),
                Module._Py_DecRef(py_result)
        }
        return Module.hiwire.pop_value(result)
    }
    function pyimport(mod_name) {
        return Module.importlib.import_module(mod_name)
    }
    function unpackArchive(buffer, format, extract_dir) {
        Module._util_module || (Module._util_module = pyimport("pyodide._util")),
            Module._util_module.unpack_buffer_archive.callKwargs(buffer, {
                format: format,
                extract_dir: extract_dir
            })
    }
    function setInterruptBuffer(interrupt_buffer) {
        Module.interrupt_buffer = interrupt_buffer,
            Module._set_pyodide_callback(!!interrupt_buffer)
    }
    function checkInterrupt() {
        2 === Module.interrupt_buffer[0] && (Module.interrupt_buffer[0] = 0,
            Module._PyErr_SetInterrupt(),
            Module.runPython(""))
    }
    function makePublicAPI() {
        const FS = Module.FS;
        let namespace = {
            globals: globals,
            FS: FS,
            pyodide_py: pyodide_py,
            version: "",
            loadPackage: loadPackage,
            loadPackagesFromImports: loadPackagesFromImports,
            loadedPackages: loadedPackages,
            isPyProxy: isPyProxy,
            runPython: runPython,
            runPythonAsync: runPythonAsync,
            registerJsModule: registerJsModule,
            unregisterJsModule: unregisterJsModule,
            setInterruptBuffer: setInterruptBuffer,
            checkInterrupt: checkInterrupt,
            toPy: toPy,
            pyimport: pyimport,
            unpackArchive: unpackArchive,
            registerComlink: registerComlink,
            PythonError: PythonError,
            PyBuffer: PyBuffer
        };
        return namespace._module = Module,
            Module.public_api = namespace,
            namespace
    }
    Module.runPython = runPython,
        Module.runPythonAsync = runPythonAsync,
        Module.saveState = () => Module.pyodide_py._state.save_state(),
        Module.restoreState = state => Module.pyodide_py._state.restore_state(state),
        Module.dump_traceback = function () {
            Module.__Py_DumpTraceback(1, Module._PyGILState_GetThisThreadState())
        }
        ;
    let runPythonInternal_dict, fatal_error_occurred = !1;
    function finalizeBootstrap(config) {
        runPythonInternal_dict = Module._pyodide._base.eval_code("{}"),
            Module.importlib = Module.runPythonInternal("import importlib; importlib");
        let import_module = Module.importlib.import_module;
        Module.sys = import_module("sys"),
            Module.sys.path.insert(0, config.homedir);
        let globals = Module.runPythonInternal("import __main__; __main__.__dict__")
            , builtins = Module.runPythonInternal("import builtins; builtins.__dict__");
        var builtins_dict;
        Module.globals = (builtins_dict = builtins,
            new Proxy(globals, {
                get: (target, symbol) => "get" === symbol ? key => {
                    let result = target.get(key);
                    return void 0 === result && (result = builtins_dict.get(key)),
                        result
                }
                    : "has" === symbol ? key => target.has(key) || builtins_dict.has(key) : Reflect.get(target, symbol)
            }));
        let importhook = Module._pyodide._importhook;
        importhook.register_js_finder(),
            importhook.register_js_module("js", config.jsglobals);
        let pyodide = makePublicAPI();
        return importhook.register_js_module("pyodide_js", pyodide),
            Module.pyodide_py = import_module("pyodide"),
            Module.version = Module.pyodide_py.__version__,
            pyodide.pyodide_py = Module.pyodide_py,
            pyodide.version = Module.version,
            pyodide.globals = Module.globals,
            pyodide
    }
    async function loadPyodide(config) {
        if (globalThis.__pyodide_module)
            throw new Error("Pyodide is already loading.");
        if (!config.indexURL)
            throw new Error("Please provide indexURL parameter to loadPyodide");
        loadPyodide.inProgress = !0,
            globalThis.__pyodide_module = Module;
        const default_config = {
            fullStdLib: !0,
            jsglobals: globalThis,
            stdin: globalThis.prompt ? globalThis.prompt : void 0,
            homedir: "/home/pyodide"
        };
        (config = Object.assign(default_config, config)).indexURL.endsWith("/") || (config.indexURL += "/"),
            Module.indexURL = config.indexURL;
        let packageIndexReady = async function (indexURL) {
            let package_json;
            if (baseURL = indexURL,
                IN_NODE) {
                const fsPromises = await import("fs/promises")
                    , package_string = await fsPromises.readFile(`${indexURL}packages.json`);
                package_json = JSON.parse(package_string)
            } else {
                let response = `{"info":{"arch":"wasm32","platform":"Emscripten-1.0"},"packages":{"asciitree":{"name":"asciitree","version":"0.3.3","depends":[],"imports":["asciitree"]},"astropy":{"name":"astropy","version":"5.0","depends":["distutils","packaging","numpy","pyerfa"],"imports":["astropy"]},"atomicwrites":{"name":"atomicwrites","version":"1.4.0","depends":[],"imports":["atomicwrites"]},"attrs":{"name":"attrs","version":"21.4.0","depends":["six"],"imports":["attr"]},"autograd":{"name":"autograd","version":"1.3","depends":["numpy","future"],"imports":["autograd"],"unvendored_tests":true},"autograd-tests":{"name":"autograd-tests","version":"1.3","depends":["autograd"],"imports":[]},"beautifulsoup4":{"name":"beautifulsoup4","version":"4.9.3","depends":["soupsieve"],"imports":["bs4"],"unvendored_tests":true},"beautifulsoup4-tests":{"name":"beautifulsoup4-tests","version":"4.9.3","depends":["beautifulsoup4"],"imports":[]},"biopython":{"name":"biopython","version":"1.79","depends":["numpy"],"imports":["Bio"]},"bleach":{"name":"bleach","version":"4.1.0","depends":["webencodings","packaging","six"],"imports":["bleach"]},"bokeh":{"name":"bokeh","version":"2.4.2","depends":["distutils","numpy","jinja2","pillow","python-dateutil","six","typing-extensions","pyyaml"],"imports":["bokeh"]},"cffi":{"name":"cffi","version":"1.14.6","depends":["pycparser"],"imports":["cffi"]},"cffi_example":{"name":"cffi_example","version":"0.1","depends":["cffi"],"imports":["cffi_example"]},"clapack":{"name":"CLAPACK","version":"3.2.1","shared_library":true,"depends":[],"imports":["CLAPACK"]},"cloudpickle":{"name":"cloudpickle","version":"2.0.0","depends":[],"imports":["cloudpickle"]},"cssselect":{"name":"cssselect","version":"1.1.0","depends":[],"imports":["cssselect"]},"cycler":{"name":"cycler","version":"0.11.0","depends":["six"],"imports":["cycler"]},"cytoolz":{"name":"cytoolz","version":"0.11.2","depends":["nose","toolz"],"imports":["cytoolz"],"unvendored_tests":true},"cytoolz-tests":{"name":"cytoolz-tests","version":"0.11.2","depends":["cytoolz"],"imports":[]},"decorator":{"name":"decorator","version":"5.1.1","depends":[],"imports":["decorator"]},"distlib":{"name":"distlib","version":"0.3.1","depends":[],"imports":["distlib"]},"distutils":{"name":"distutils","version":"1.0","depends":[],"imports":["distutils"]},"docutils":{"name":"docutils","version":"0.18.1","depends":[],"imports":["docutils"]},"fpcast-test":{"name":"fpcast-test","version":"0.1","depends":[],"imports":["fpcast_test"]},"freesasa":{"name":"freesasa","version":"2.1.0","depends":[],"imports":["freesasa"]},"future":{"name":"future","version":"0.18.2","depends":[],"imports":["future"],"unvendored_tests":true},"future-tests":{"name":"future-tests","version":"0.18.2","depends":["future"],"imports":[]},"html5lib":{"name":"html5lib","version":"1.1","depends":["webencodings","six"],"imports":["html5lib"]},"imageio":{"name":"imageio","version":"2.9.0","depends":["numpy","pillow"],"imports":["imageio"]},"iniconfig":{"name":"iniconfig","version":"1.1.1","depends":[],"imports":["iniconfig"]},"jedi":{"name":"jedi","version":"0.18.1","depends":["parso"],"imports":["jedi"],"unvendored_tests":true},"jedi-tests":{"name":"jedi-tests","version":"0.18.1","depends":["jedi"],"imports":[]},"jinja2":{"name":"Jinja2","version":"3.0.3","depends":["markupsafe"],"imports":["jinja2"]},"joblib":{"name":"joblib","version":"0.11","depends":["distutils"],"imports":["joblib"],"unvendored_tests":true},"joblib-tests":{"name":"joblib-tests","version":"0.11","depends":["joblib"],"imports":[]},"kiwisolver":{"name":"kiwisolver","version":"1.3.2","depends":[],"imports":["kiwisolver"]},"logbook":{"name":"logbook","version":"1.5.2","depends":["distutils","setuptools"],"imports":["logbook"]},"lxml":{"name":"lxml","version":"4.4.1","depends":["beautifulsoup4","cssselect","html5lib"],"imports":["lxml","lxml.etree","lxml.objectify"]},"markupsafe":{"name":"MarkupSafe","version":"2.0.1","depends":[],"imports":["markupsafe"]},"matplotlib":{"name":"matplotlib","version":"3.3.3","depends":["distutils","cycler","kiwisolver","numpy","pillow","pyparsing","python-dateutil","pytz"],"imports":["matplotlib","mpl_toolkits"],"unvendored_tests":true},"matplotlib-tests":{"name":"matplotlib-tests","version":"3.3.3","depends":["matplotlib"],"imports":[]},"micropip":{"name":"micropip","version":"0.1","depends":["pyparsing","packaging","distutils"],"imports":["micropip"]},"mne":{"name":"mne","version":"0.24.1","depends":["distutils","numpy","scipy","setuptools"],"imports":["mne"],"unvendored_tests":true},"mne-tests":{"name":"mne-tests","version":"0.24.1","depends":["mne"],"imports":[]},"more-itertools":{"name":"more-itertools","version":"8.8.0","depends":[],"imports":["more_itertools"]},"mpmath":{"name":"mpmath","version":"1.2.1","depends":[],"imports":["mpmath"],"unvendored_tests":true},"mpmath-tests":{"name":"mpmath-tests","version":"1.2.1","depends":["mpmath"],"imports":[]},"msgpack":{"name":"msgpack","version":"1.0.3","depends":[],"imports":["msgpack"]},"networkx":{"name":"networkx","version":"2.6.3","depends":["decorator","setuptools","matplotlib","numpy"],"imports":["networkx","networkx.algorithms","networkx.algorithms.approximation","networkx.algorithms.assortativity","networkx.algorithms.bipartite","networkx.algorithms.centrality","networkx.algorithms.chordal","networkx.algorithms.coloring","networkx.algorithms.community","networkx.algorithms.components","networkx.algorithms.connectivity","networkx.algorithms.flow","networkx.algorithms.isomorphism","networkx.algorithms.link_analysis","networkx.algorithms.node_classification","networkx.algorithms.operators","networkx.algorithms.shortest_paths","networkx.algorithms.traversal","networkx.algorithms.tree","networkx.classes","networkx.drawing","networkx.generators","networkx.linalg","networkx.readwrite","networkx.readwrite.json_graph","networkx.utils"],"unvendored_tests":true},"networkx-tests":{"name":"networkx-tests","version":"2.6.3","depends":["networkx"],"imports":[]},"nlopt":{"name":"nlopt","version":"2.7.0","depends":["numpy"],"imports":["nlopt"]},"nltk":{"name":"nltk","version":"3.6.7","depends":["regex"],"imports":["nltk","sqlite3"],"unvendored_tests":true},"nltk-tests":{"name":"nltk-tests","version":"3.6.7","depends":["nltk"],"imports":[]},"nose":{"name":"nose","version":"1.3.7","depends":["setuptools"],"imports":["nose"]},"numcodecs":{"name":"numcodecs","version":"0.9.1","depends":["numpy","msgpack"],"imports":["numcodecs"],"unvendored_tests":true},"numcodecs-tests":{"name":"numcodecs-tests","version":"0.9.1","depends":["numcodecs"],"imports":[]},"numpy":{"name":"numpy","version":"1.21.4","depends":[],"imports":["numpy"],"unvendored_tests":true},"numpy-tests":{"name":"numpy-tests","version":"1.21.4","depends":["numpy"],"imports":[]},"optlang":{"name":"optlang","version":"1.5.2","depends":["sympy","six","swiglpk"],"imports":["optlang","optlang.glpk_interface","optlang.symbolics"],"unvendored_tests":true},"optlang-tests":{"name":"optlang-tests","version":"1.5.2","depends":["optlang"],"imports":[]},"packaging":{"name":"packaging","version":"21.3","depends":["pyparsing"],"imports":["packaging"]},"pandas":{"name":"pandas","version":"1.3.5","depends":["distutils","numpy","python-dateutil","pytz","setuptools"],"imports":["pandas"],"unvendored_tests":true},"pandas-tests":{"name":"pandas-tests","version":"1.3.5","depends":["pandas"],"imports":[]},"parso":{"name":"parso","version":"0.8.3","depends":[],"imports":["parso"]},"patsy":{"name":"patsy","version":"0.5.2","depends":["numpy","six"],"imports":["patsy"],"unvendored_tests":true},"patsy-tests":{"name":"patsy-tests","version":"0.5.2","depends":["patsy"],"imports":[]},"pillow":{"name":"pillow","version":"9.0.0","depends":[],"imports":["PIL"]},"pluggy":{"name":"pluggy","version":"1.0.0","depends":[],"imports":["pluggy"]},"py":{"name":"py","version":"1.9.0","depends":[],"imports":["py","py.code"]},"pyb2d":{"name":"pyb2d","version":"0.7.2","depends":["numpy","pydantic","setuptools"],"imports":["b2d","b2d.testbed"]},"pycparser":{"name":"pycparser","version":"2.21","depends":[],"imports":["pycparser"]},"pydantic":{"name":"pydantic","version":"1.9.0","depends":["typing-extensions"],"imports":["pydantic"]},"pyerfa":{"name":"pyerfa","version":"2.0.0.1","depends":["numpy"],"imports":["erfa"],"unvendored_tests":true},"pyerfa-tests":{"name":"pyerfa-tests","version":"2.0.0.1","depends":["pyerfa"],"imports":[]},"pygments":{"name":"Pygments","version":"2.9.0","depends":[],"imports":["pygments"]},"pyodide-interrupts":{"name":"pyodide-interrupts","version":"0.1.1","depends":[],"imports":["pyodide_interrupts"]},"pyparsing":{"name":"pyparsing","version":"3.0.6","depends":[],"imports":["pyparsing"]},"pyrsistent":{"name":"pyrsistent","version":"0.18.0","depends":[],"imports":["pyrsistent"]},"pytest":{"name":"pytest","version":"6.2.5","depends":["atomicwrites","attrs","more-itertools","pluggy","py","setuptools","six","iniconfig"],"imports":["pytest"]},"python-dateutil":{"name":"python-dateutil","version":"2.8.2","depends":["six"],"imports":["dateutil"]},"python-sat":{"name":"python-sat","version":"0.1.7.dev15","depends":["six"],"imports":["pysat"]},"pytz":{"name":"pytz","version":"2021.3","depends":[],"imports":["pytz"]},"pywavelets":{"name":"pywavelets","version":"1.2.0","depends":["distutils","numpy","matplotlib","scipy"],"imports":["pywt"],"unvendored_tests":true},"pywavelets-tests":{"name":"pywavelets-tests","version":"1.2.0","depends":["pywavelets"],"imports":[]},"pyyaml":{"name":"pyyaml","version":"6.0","depends":[],"imports":["yaml"]},"regex":{"name":"regex","version":"2021.7.6","depends":[],"imports":["regex"],"unvendored_tests":true},"regex-tests":{"name":"regex-tests","version":"2021.7.6","depends":["regex"],"imports":[]},"retrying":{"name":"retrying","version":"1.3.3","depends":["six"],"imports":["retrying"]},"scikit-image":{"name":"scikit-image","version":"0.19.1","depends":["distutils","packaging","numpy","scipy","matplotlib","networkx","pillow","imageio","pywavelets"],"imports":["skimage"],"unvendored_tests":true},"scikit-image-tests":{"name":"scikit-image-tests","version":"0.19.1","depends":["scikit-image"],"imports":[]},"scikit-learn":{"name":"scikit-learn","version":"1.0.2","depends":["numpy","scipy","joblib","threadpoolctl"],"imports":["sklearn","sklearn.calibration","sklearn.cluster","sklearn.compose","sklearn.covariance","sklearn.cross_decomposition","sklearn.datasets","sklearn.decomposition","sklearn.discriminant_analysis","sklearn.dummy","sklearn.ensemble","sklearn.exceptions","sklearn.externals","sklearn.feature_extraction","sklearn.feature_selection","sklearn.gaussian_process","sklearn.impute","sklearn.isotonic","sklearn.kernel_approximation","sklearn.kernel_ridge","sklearn.linear_model","sklearn.manifold","sklearn.metrics","sklearn.mixture","sklearn.model_selection","sklearn.multiclass","sklearn.multioutput","sklearn.naive_bayes","sklearn.neighbors","sklearn.neural_network","sklearn.pipeline","sklearn.preprocessing","sklearn.random_projection","sklearn.semi_supervised","sklearn.svm","sklearn.tree","sklearn.utils"],"unvendored_tests":true},"scikit-learn-tests":{"name":"scikit-learn-tests","version":"1.0.2","depends":["scikit-learn"],"imports":[]},"scipy":{"name":"scipy","version":"1.7.3","depends":["numpy","clapack"],"imports":["scipy","scipy.cluster","scipy.cluster.vq","scipy.cluster.hierarchy","scipy.constants","scipy.fft","scipy.fftpack","scipy.integrate","scipy.interpolate","scipy.io","scipy.io.arff","scipy.io.matlab","scipy.io.wavfile","scipy.linalg","scipy.linalg.blas","scipy.linalg.cython_blas","scipy.linalg.lapack","scipy.linalg.cython_lapack","scipy.linalg.interpolative","scipy.misc","scipy.ndimage","scipy.odr","scipy.optimize","scipy.signal","scipy.signal.windows","scipy.sparse","scipy.sparse.linalg","scipy.sparse.csgraph","scipy.spatial","scipy.spatial.distance","scipy.spatial.transform","scipy.special","scipy.stats","scipy.stats.contingency","scipy.stats.distributions","scipy.stats.mstats","scipy.stats.qmc"],"unvendored_tests":true},"scipy-tests":{"name":"scipy-tests","version":"1.7.3","depends":["scipy"],"imports":[]},"setuptools":{"name":"setuptools","version":"60.3.1","depends":["distutils","pyparsing"],"imports":["setuptools","pkg_resources"],"unvendored_tests":true},"setuptools-tests":{"name":"setuptools-tests","version":"60.3.1","depends":["setuptools"],"imports":[]},"sharedlib-test":{"name":"sharedlib-test","version":"1.0","shared_library":true,"depends":[],"imports":["sharedlib-test"]},"sharedlib-test-py":{"name":"sharedlib-test-py","version":"1.0","depends":["sharedlib-test"],"imports":["sharedlib_test"]},"six":{"name":"six","version":"1.16.0","depends":[],"imports":["six"]},"soupsieve":{"name":"soupsieve","version":"2.3.1","depends":["beautifulsoup4"],"imports":["soupsieve"]},"sqlalchemy":{"name":"sqlalchemy","version":"1.4.29","depends":[],"imports":["sqlalchemy"],"unvendored_tests":true},"sqlalchemy-tests":{"name":"sqlalchemy-tests","version":"1.4.29","depends":["sqlalchemy"],"imports":[]},"statsmodels":{"name":"statsmodels","version":"0.13.1","depends":["distutils","numpy","scipy","pandas","patsy"],"imports":["statsmodels","statsmodels.api"],"unvendored_tests":true},"statsmodels-tests":{"name":"statsmodels-tests","version":"0.13.1","depends":["statsmodels"],"imports":[]},"swiglpk":{"name":"swiglpk","version":"5.0.3","depends":[],"imports":["swiglpk"]},"sympy":{"name":"sympy","version":"1.9","depends":["distutils","mpmath"],"imports":["sympy"],"unvendored_tests":true},"sympy-tests":{"name":"sympy-tests","version":"1.9","depends":["sympy"],"imports":[]},"test":{"name":"test","version":"1.0","depends":[],"imports":["test"]},"threadpoolctl":{"name":"threadpoolctl","version":"3.0.0","depends":[],"imports":["threadpoolctl"]},"toolz":{"name":"toolz","version":"0.11.2","depends":[],"imports":["toolz"],"unvendored_tests":true},"toolz-tests":{"name":"toolz-tests","version":"0.11.2","depends":["toolz"],"imports":[]},"traits":{"name":"traits","version":"6.3.2","depends":[],"imports":["traits"],"unvendored_tests":true},"traits-tests":{"name":"traits-tests","version":"6.3.2","depends":["traits"],"imports":[]},"typing-extensions":{"name":"typing-extensions","version":"4.0.1","shared_library":true,"depends":[],"imports":["typing_extensions"]},"uncertainties":{"name":"uncertainties","version":"3.1.6","depends":["future"],"imports":["uncertainties"],"unvendored_tests":true},"uncertainties-tests":{"name":"uncertainties-tests","version":"3.1.6","depends":["uncertainties"],"imports":[]},"webencodings":{"name":"webencodings","version":"0.5.1","depends":[],"imports":["webencodings"]},"wrapt":{"name":"wrapt","version":"1.13.3","depends":[],"imports":["wrapt"]},"xlrd":{"name":"xlrd","version":"2.0.1","depends":[],"imports":["xlrd"]},"yt":{"name":"yt","version":"3.6.1","depends":["numpy","matplotlib","sympy","setuptools"],"imports":["yt"]},"zarr":{"name":"zarr","version":"2.8.3","depends":["numpy","asciitree","numcodecs"],"imports":["zarr"],"unvendored_tests":true},"zarr-tests":{"name":"zarr-tests","version":"2.8.3","depends":["zarr"],"imports":[]}}}`;
                package_json = JSON.parse(response);
            }
            if (!package_json.packages)
                throw new Error("Loaded packages.json does not contain the expected key 'packages'.");
            Module.packages = package_json.packages,
                Module._import_name_to_package_name = new Map;
            for (let name of Object.keys(Module.packages))
                for (let import_name of Module.packages[name].imports)
                    Module._import_name_to_package_name.set(import_name, name)
        }(config.indexURL)
            , pyodide_py_tar_promise = async function (indexURL, path) {
                if (IN_NODE) {
                    const fsPromises = await import("fs/promises");
                    return (await fsPromises.readFile(`${indexURL}${path}`)).buffer
                }
                {
                    if (path == 'pyodide_py.tar') return pyodide_py_tar
                    let response = await fetch(`${indexURL}${path}`);
                    return await response.arrayBuffer()
                }
            }(config.indexURL, "pyodide_py.tar");
        var path;
        setStandardStreams(config.stdin, config.stdout, config.stderr),
            path = config.homedir,
            Module.preRun.push((function () {
                try {
                    Module.FS.mkdirTree(path)
                } catch (e) {
                    console.error(`Error occurred while making a home directory '${path}':`),
                        console.error(e),
                        console.error("Using '/' for a home directory instead"),
                        path = "/"
                }
                Module.ENV.HOME = path,
                    Module.FS.chdir(path)
            }
            ));
        let moduleLoaded = new Promise((r => Module.postRun = r));
        await _createPyodideModule(Module),
            await moduleLoaded;
        !function (pyodide_py_tar) {
            let stream = Module.FS.open("/pyodide_py.tar", "w");
            Module.FS.write(stream, new Uint8Array(pyodide_py_tar), 0, pyodide_py_tar.byteLength, void 0, !0),
                Module.FS.close(stream);
            const code_ptr = Module.stringToNewUTF8('\nimport shutil\nshutil.unpack_archive("/pyodide_py.tar", "/lib/python3.9/site-packages/")\ndel shutil\nimport importlib\nimportlib.invalidate_caches()\ndel importlib\n    ');
            if (Module._PyRun_SimpleString(code_ptr))
                throw new Error("OOPS!");
            Module._free(code_ptr),
                Module.FS.unlink("/pyodide_py.tar")
        }(await pyodide_py_tar_promise),
            Module._pyodide_init();
        let pyodide = finalizeBootstrap(config);
        return await packageIndexReady,
            // config.fullStdLib && await loadPackage(["distutils"]),
            pyodide.runPython("print('Python initialization complete')"),
            pyodide
    }
    Module.fatal_error = function (e) {
        if (!e.pyodide_fatal_error) {
            if (fatal_error_occurred)
                return console.error("Recursive call to fatal_error. Inner error was:"),
                    void console.error(e);
            e.pyodide_fatal_error = !0,
                fatal_error_occurred = !0,
                console.error("Pyodide has suffered a fatal error. Please report this to the Pyodide maintainers."),
                console.error("The cause of the fatal error was:"),
                Module.inTestHoist ? (console.error(e.toString()),
                    console.error(e.stack)) : console.error(e);
            try {
                Module.dump_traceback();
                for (let key of Object.keys(Module.public_api))
                    key.startsWith("_") || "version" === key || Object.defineProperty(Module.public_api, key, {
                        enumerable: !0,
                        configurable: !0,
                        get: () => {
                            throw new Error("Pyodide already fatally failed and can no longer be used.")
                        }
                    });
                Module.on_fatal && Module.on_fatal(e)
            } catch (err2) {
                console.error("Another error occurred while handling the fatal error:"),
                    console.error(err2)
            }
            throw e
        }
    }
        ,
        Module.runPythonInternal = function (code) {
            return Module._pyodide._base.eval_code(code, runPythonInternal_dict)
        }
        ,
        globalThis.loadPyodide = loadPyodide,
        exports.loadPyodide = loadPyodide,
        Object.defineProperty(exports, "__esModule", {
            value: !0
        })
}
));
