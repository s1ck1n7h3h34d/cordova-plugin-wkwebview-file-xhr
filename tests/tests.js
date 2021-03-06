/*
 Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */

/* jshint jasmine: true */
/* global Connection */

exports.defineAutoTests = function ()
{
  var SECURE_TESTS_DOMAIN = "https://den01cxr.us.oracle.com:7102";
  var NONSECURE_TESTS_DOMAIN = "http://den01cxr.us.oracle.com:7101";

  var expects = {};

  window.xhrCallback = function (id, result)
  {
    expects[id](result);
    delete expects[id];
  }

  describe('http:// GET remote:', function ()
  {
    it("responseType text, loadend addEventListener", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("Hello World");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.addEventListener("loadend", loadend);
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.html");
      xhr.send();

    });

    it("responseType text, loadend onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("Hello World");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.html");
      xhr.send();
    });

    it("responseType text, loadend onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("Hello World");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.html");
      xhr.send();
    });


    it("responseType arraybuffer, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response instanceof ArrayBuffer).toEqual(true);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.png");
      xhr.responseType = "arraybuffer";
      xhr.send();
    });

    it("responseType blob, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response instanceof Blob).toEqual(true);
        expect(this.response.type).toEqual("text/html");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.html");
      xhr.responseType = "blob";
      xhr.send();
    });

    it("responseType document, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response instanceof Document).toEqual(true);
        expect(this.response.querySelector("h1").textContent).toEqual("Hello World");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.html");
      xhr.responseType = "document";
      xhr.send();
    });

    it("responseType json, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response.message).toEqual("Hello World");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/simple-test.json");
      xhr.responseType = "json";
      xhr.send();
    });
  });

  describe('http:// POST remote:', function ()
  {
    it("post HTML with responseType text, loadend addEventListener", function (done)
    {
      var html = "<html><body><h1>Hello World</h1></body></html>";

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response).toEqual(html);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.addEventListener("loadend", loadend);
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/playbackservlet");
      xhr.responseType = "text";
      xhr.send(html);
    });

    it("post ArrayBuffer with responseType ArrayBuffer, onloadend listener", function (done)
    {
      var bin = [];
      bin.length = 1000;
      bin.fill(0, 0, 1000);

      var inBuff = new Int8Array(bin);

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response instanceof ArrayBuffer).toBeDefined();

        // compare content
        var outBuff = new Int8Array(this.response);
        var bout = outBuff['slice'] ? outBuff.slice() : outBuff;
        var isSame = true;
        for (var i = 0; i < bout.length; i++)
        {
          if (bout[i] !== bin[i])
          {
            isSame = false;
            break;
          }
        }

        expect(isSame).toEqual(true);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/playbackservlet");
      xhr.responseType = "arraybuffer";
      xhr.send(inBuff);
    });

    it("post ArrayBuffer with responseType Blob, onloadend listener", function (done)
    {
      function toArrayBuffer(blob)
      {
        var reader = new FileReader();
        var promise = new Promise(function (resolve, reject)
        {
          reader.onload = function ()
          {
            resolve(reader.result);
          };

        });

        reader.readAsArrayBuffer(blob);
        return promise;
      }


      var bin = [];
      bin.length = 1000;
      bin.fill(0, 0, 1000);
      var inBuff = new Int8Array(bin);

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response instanceof Blob).toBeDefined();

        toArrayBuffer(this.response).then(function (response)
        {
          // compare content
          var outBuff = new Int8Array(response);
          var bout = outBuff['slice'] ? outBuff.slice() : outBuff;
          var isSame = true;
          for (var i = 0; i < bout.length; i++)
          {
            if (bout[i] !== bin[i])
            {
              isSame = false;
              break;
            }
          }

          expect(isSame).toEqual(true);
          done();
        });
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/playbackservlet");
      xhr.responseType = "blob";
      xhr.send(inBuff);
    });

    /*
     * TODO Safari only implements the append function on the FormData?
     it("post FormData with responseType text, onloadend listener", function (done)
     {
     var fd = new FormData();
     fd.append("param1", "1");
     fd.append("param2", "2");
     
     function loadend(event)
     {
     expect(this.status).toBe(200);
     expect(this.response).toBeDefined();
     expect(this.response).toEqual("param1=1&param2=2");
     done();
     }
     
     var xhr = new XMLHttpRequest();
     xhr.onloadend = loadend;
     xhr.open("POST", "http://den01cxr.us.oracle.com:7101/RestApp-ViewController-context-root/playbackservlet");
     xhr.responseType = "text";
     xhr.send(fd);
     
     });
     */

    it("post document with responseType document, onloadend listener", function (done)
    {

      function loadend(event)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response.title).toEqual(document.title);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/playbackservlet");
      xhr.responseType = "document";
      xhr.send(document);

    });

    it("post HTML test upload events", function (done)
    {
      var html = "<html><body><h1>Hello World</h1></body></html>";

      var uploadEvents = [];
      function captureUploadEvents(event)
      {
        uploadEvents.push(event.type);
      }

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response).toEqual(html);
        expect(uploadEvents).toContain("loadstart");
        expect(uploadEvents).toContain("progress");
        expect(uploadEvents).toContain("load");
        expect(uploadEvents).toContain("loadend");
        done();
      }

      var xhr = new XMLHttpRequest();

      ["ontimeout", "onloadstart", "onprogress", "onabort", "onerror", "onload", "onloadend"
      ].forEach(function (propName)
      {
        xhr.upload[propName] = captureUploadEvents;
      });

      xhr.onloadend = loadend;
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/playbackservlet");
      xhr.responseType = "text";
      xhr.send(html);
    });

  });


  describe('file:// GET:', function ()
  {
    _resolveUri = function (uri)
    {    
      var resolver = document.createElement("a");
      document.body.appendChild(resolver);
      resolver.href = uri;
      var absoluteUri = resolver.href; 
      resolver.parentNode.removeChild(resolver);
      return absoluteUri;
    };
    
    
    it("responseType text, loadend addEventListener", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("folder.");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.addEventListener("loadend", loadend);
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.html");
      xhr.send();

    });
    
    it("responseType text, absolute URL, loadend addEventListener", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("folder.");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.addEventListener("loadend", loadend);
      var uri = _resolveUri("../wkwebview-file-xhr-tests/customers.html");
      xhr.open("GET", uri);
      xhr.send();

    });    
    
    it("responseType text, loadend onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("folder.");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.html");
      xhr.send();
    });

    it("responseType text, loadend onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.readyState).toBe(this.DONE);
        expect(this.status).toBe(200);
        expect(this.responseText).toBeDefined();
        expect(this.responseText).toContain("folder.");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.html");
      xhr.send();
    });


    it("responseType arraybuffer, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response instanceof ArrayBuffer).toEqual(true);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.html");
      xhr.responseType = "arraybuffer";
      xhr.send();
    });

    it("responseType blob, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response instanceof Blob).toEqual(true);
        expect(this.response.type).toEqual("text/html");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.html");
      xhr.responseType = "blob";
      xhr.send();
    });

    it("responseType document, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response instanceof Document).toEqual(true);
        expect(this.response.getElementById("contentHeader").textContent).toEqual(
          "Customers Content Area");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.html");
      xhr.responseType = "document";
      xhr.send();
    });

    it("responseType json, loaded onloadend", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response.name).toEqual("anonymous");
        expect(this.response.comment).toContain("Copyright (c) 2014, 2016");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.onloadend = loadend;
      xhr.open("GET", "wkwebview-file-xhr-tests/customers.json");
      xhr.responseType = "json";
      xhr.send();
    });
  });

  describe('REST end-points:', function ()
  {
    it("GET Request", function (done)
    {
      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        var products = this.response;
        expect(products.length).toEqual(100);
        expect(products[0].id).toEqual(0);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.open("GET",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/get");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onloadend = loadend;
      xhr.responseType = "json";
      xhr.send();
    });

    it("POST Request", function (done)
    {
      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response.id).toEqual(99);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/post");
      xhr.onloadend = loadend;
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(JSON.stringify({id: 99, name: "Product 99"}));
    });

    it("PUT Request", function (done)
    {
      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response.id).toEqual(99);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.open("PUT",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/put");
      xhr.onloadend = loadend;
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(JSON.stringify({id: 99, name: "Product 99"}));
    });

    it("DELETE Request", function (done)
    {
      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();
        expect(this.response.id).toEqual(99);
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.open("DELETE",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/delete");
      xhr.onloadend = loadend;
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(JSON.stringify({id: 99, name: "Product 99"}));
    });

    it("POST timeout", function (done)
    {
      var events = [];
      function logEvents(event)
      {
        events.push(event.type);
      }

      function loadend(evt)
      {
        expect(this.status).toBe(0);
        expect(this.response).not.toBeDefined();
        expect(events).toContain("loadstart");
        expect(events).toContain("progress");
        expect(events).toContain("timeout");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST",
        SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/postTimeout");
      xhr.onloadend = loadend;
      xhr.onloadstart = logEvents;
      xhr.onprogress = logEvents;
      xhr.ontimeout = logEvents;
      xhr.timeout = 1;
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(JSON.stringify({timeout: 5000}));
    });

    it("GET utf-16", function (done)
    {

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toEqual(unescape("nice tunes \u000E\u000E"));
        expect(this.getResponseHeader("content-type")).toEqual("text/html;charset=utf-16");
        expect(this.getResponseHeader("Content-Type")).toEqual("text/html;charset=utf-16");
        done();
      }

      var xhr = new XMLHttpRequest();
      xhr.open("GET",
        SECURE_TESTS_DOMAIN +
        "/RestApp-ViewController-context-root/rest/products/getspecialenc");
      xhr.onloadend = loadend;
      xhr.responseType = "text";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "text/html");
      xhr.send();
    });

  }, 10000);

  describe('Cordova API:', function ()
  {
    it("CDVWKWebViewFileXhr readAsText no args", function (done)
    {
      function success()
      {
        // should not be called
        expect(true).toEqual(false);
        done();
      }
      function error()
      {
        expect(true).toEqual(true);
        done();
      }
      var exec = require('cordova/exec');
      // invoke readAsText with on arguments.  expected outcome is an error
      exec(success, error, "CDVWKWebViewFileXhr", "readAsText", []);
    });

    it("CDVWKWebViewFileXhr readAsArrayBuffer no args", function (done)
    {
      function success()
      {
        // should not be called
        expect(true).toEqual(false);
        done();
      }
      function error()
      {
        expect(true).toEqual(true);
        done();
      }
      var exec = require('cordova/exec');
      // invoke readAsArrayBuffer with on arguments.  expected outcome is an error
      exec(success, error, "CDVWKWebViewFileXhr", "readAsArrayBuffer", []);
    });

    it("CDVWKWebViewFileXhr readAsText relative path security 404", function (done)
    {
      function success()
      {
        // should not be called
        expect(true).toEqual(false);
        done();
      }
      function error(msg)
      {
        expect(true).toEqual(true);
        done();
      }
      var exec = require('cordova/exec');
      // invoke readAsArrayBuffer with on arguments.  expected outcome is an error
      exec(success, error, "CDVWKWebViewFileXhr", "readAsText", ["../cordova/Api.js"]);
    });
  });

  describe('nativeXHR remote GET', function ()
  {
    it("nativeXHR GET Request", function (done)
    {
      expects["id1"] = function (result)
      {
        expect(result.response.statusCode).toBe(200);
        expect(result.response.mimeType).toBe("application/json");
        expect(result.response.localizedStatusCode).toBe("no error");
        expect(result.response.allHeaderFields).toBeDefined();
        expect(result.response.allHeaderFields["Content-Type"]).toBe("application/json");
        expect(result.response.allHeaderFields["Content-Length"]).toBe("3881");
        expect(result.response.mimeType).toBe("application/json");
        expect(result.error).not.toBeDefined();
        expect(result.data).toBeDefined();
        done();
      };

      var xhr = {};
      xhr.headers = {"Content-Type": "application/json", "Accept": "application/json"};
      xhr.url = SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/get";
      xhr.id = "id1";
      xhr.method = "GET";
      xhr.callback = "xhrCallback";
      window.webkit.messageHandlers.nativeXHR.postMessage(xhr);
    });

    it("nativeXHR GET Missing Resource Request", function (done)
    {
      expects["id2"] = function (result)
      {
        expect(result.response.statusCode).toBe(404);
        expect(result.error).not.toBeDefined();
        expect(result.data).toBeDefined();
        done();
      };

      var xhr = {};
      xhr.url = SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/does-not-exist";
      xhr.id = "id2";
      xhr.callback = "xhrCallback";
      window.webkit.messageHandlers.nativeXHR.postMessage(xhr);
    });

    it("nativeXHR GET Server Doesn't Exist", function (done)
    {
      expects["id3"] = function (result)
      {
        expect(result.response).not.toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.data).not.toBeDefined();
        done();
      };

      var xhr = {};
      xhr.url = "http://i-am-not.a.validserver.us.oracle.com/";
      xhr.id = "id3";
      xhr.callback = "xhrCallback";
      window.webkit.messageHandlers.nativeXHR.postMessage(xhr);
    });

    it("nativeXHR getConfig", function (done)
    {

      function success(result)
      {
        // should not be called
        expect(result.InterceptRemoteRequests).toEqual("secureOnly");
        expect(["none", "full"]).toContain(result.NativeXHRLogging);
        done();
      }
      function error()
      {
        expect(false).toEqual(true);
        done();
      }
      var exec = require('cordova/exec');
      exec(success, error, "CDVWKWebViewFileXhr", "getConfig", []);

    });

    it("nativeXHR GET timeout", function (done)
    {
      expects["id4"] = function (result)
      {
        expect(result.response).not.toBeDefined();
        expect(result.error).toBeDefined();
        expect(result.error).toEqual("The request timed out.");
        expect(result.underlyingErrorCode).toBeDefined();
        expect(result.underlyingErrorCode).toEqual(-1001);
        expect(result.data).not.toBeDefined();
        done();
      };

      var xhr = {};
      xhr.headers = {"Content-Type": "application/json", "Accept": "application/json"};
      xhr.url = SECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/rest/products/postTimeout";
      xhr.id = "id4";
      xhr.timeout = 1;
      xhr.callback = "xhrCallback";
      xhr.method = "POST"
      xhr.body = btoa(JSON.stringify({timeout: 5000}));
      window.webkit.messageHandlers.nativeXHR.postMessage(xhr);
    });

    /* 
     This test is disabled due to the endpoint.  The application's config.xml must be configured with
     the AllowUntrustedCerts = on preference to enable support for self signed certificates
     */
    /*
     it("nativeXHR testAllowUntrustedCerts", function (done)
     {
     expects["id5"] = function (result)
     {
     expect(result.response.statusCode).toEqual(200);
     done();
     };
     
     var xhr = {};
     xhr.url = "https://den02mkn.us.oracle.com:4443/serviceapi/entityModel/metadata/entityTypes?count=true";
     xhr.headers = {"authorization": "Basic ZW1hYXN0ZXN0dGVuYW50MS5lbWNzYWRtaW46V2VsY29tZTEh",
     "cache-control": "no-cache",
     "x-user-identity-domain-name": "emaastesttenant1"};
     xhr.id = "id5";
     xhr.callback = "xhrCallback";
     window.webkit.messageHandlers.nativeXHR.postMessage(xhr);
     }, 30000);
     */
  });

  describe('PSR Remote:', function ()
  {
    function getMbBuffer(numMbs)
    {
      if (isNaN(numMbs))
        numMbs = 1;

      var fillArray = [];
      var bytes = numMbs * 1048576;
      fillArray.length = bytes;
      fillArray.fill(0, 0, bytes);

      return new Int8Array(fillArray);
    }

    function getMbString(numMbs)
    {
      if (isNaN(numMbs))
        numMbs = 1;

      var fillArray = [];
      var bytes = numMbs * 1048576;
      fillArray.length = bytes;
      fillArray.fill(0, 0, bytes);

      return fillArray.join("");
    }

    var logSummary = [];
    function logMeasure(test, buffsize, startTs)
    {
      var totalSecs = ((performance.now() - startTs) / 1000);
      var totalMb = buffsize / 1048576;
      var mbPerSecs = totalSecs / totalMb; 
      
      
      var msg = [test, "send/recieve", buffsize, "bytes in", + 
        totalSecs, 
        "sec(s)."].join(" ");
      
      var tokens = test.split(" ");
      logSummary.push(['"' + tokens[0] + '"',
                     '"' + tokens[1] + '"',
                     tokens[2],
                     totalMb, 
                     totalSecs,
                     mbPerSecs].join(","));
      
      console.log(msg);
    }
    
    function dumpLogSummary()
    {
      var xhr = new XMLHttpRequest();
      xhr.open("POST",
        SECURE_TESTS_DOMAIN +
        "/RestApp-ViewController-context-root/rest/products/postPsrLog");
      xhr.responseType = "text";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "text/html");
      xhr.send(logSummary.join("\n"));
      logSummary = [];
    }

    function psrTest(description, sizeInMb, resonseType, xhr, resolve)
    {
      var buff;
      if ("arraybuffer" === resonseType)
        buff = getMbBuffer(sizeInMb);
      else if ("text" === resonseType)
        buff = getMbString(sizeInMb);

      var startTs;

      function loadend(evt)
      {
        expect(this.status).toBe(200);
        expect(this.response).toBeDefined();

        var size = Number.NaN;
        if ("arraybuffer" === resonseType && this.response && !isNaN(this.response['byteLength']))
          size = this.response.byteLength;
        else if ("text" === resonseType && this.response && !isNaN(this.response['length']))
          size = this.response.length;

        logMeasure(description, size, startTs);
        resolve(true);
      }

      xhr.onloadend = loadend;
      xhr.open("POST",
        NONSECURE_TESTS_DOMAIN + "/RestApp-ViewController-context-root/playbackservlet");
      xhr.responseType = resonseType;

      startTs = performance.now();
      xhr.send(buff);
    }

    function sendXHR(description, sizeInMB, resonseType, xhr)
    {
      var execCallback = psrTest.bind(this, description, sizeInMB, resonseType, xhr);
      return new Promise(execCallback);
    }

    var MAX_RETRIES = 3;
    var MAX_MB = 5;
    
    function forEach(responseType, xhrType, retry, sizeInMb)
    {
      if (isNaN(retry))
        retry = 1;
      if (isNaN(sizeInMb))
        sizeInMb = 1;
      
      var description = [xhrType, responseType, retry].join(" ");

      var xhr;
      if (xhrType === "NativeJS")
      {
        xhr = new window._XMLHttpRequest();
      }
      else if (xhrType === "DelegateNativeJS")
      {
        xhr = new XMLHttpRequest();
        xhr.__setInterceptRemoteRequests("none");
      }
      else if (xhrType === "NativeIOS")
      {
        xhr = new XMLHttpRequest();
        xhr.__setInterceptRemoteRequests("all");
      }

      return sendXHR(description, sizeInMb, responseType, xhr).then(function ()
      {
        if (MAX_RETRIES < ++retry)
        {
          retry = 1;
          if (MAX_MB < ++sizeInMb)
            return Promise.resolve(true);
        }
        
        return forEach(responseType, xhrType, retry, sizeInMb);            
      });
    }

    it("Native JS arraybuffer send/recieve", function (done)
    {
      forEach("arraybuffer", "NativeJS").then(function ()
      {
        done();
      });
    }, 240000);

    it("Delegate Native JS arraybuffer send/recieve", function (done)
    {
      forEach("arraybuffer", "DelegateNativeJS").then(function ()
      {
        done();
      });
    }, 240000);

    it("Native IOS arraybuffer send/recieve", function (done)
    {
      forEach("arraybuffer", "NativeIOS").then(function ()
      {
        done();
      });
    }, 240000);


    it("Native JS text send/recieve", function (done)
    {
      forEach("text", "NativeJS").then(function ()
      {
        done();
      });
    }, 240000);

    it("Delegate Native JS text send/recieve", function (done)
    {
      forEach("text", "DelegateNativeJS").then(function ()
      {
        done();
      });
    }, 240000);

    it("Native IOS text send/recieve", function (done)
    {
      forEach("text", "NativeIOS").then(function ()
      {
        done();
        dumpLogSummary();
      });
    }, 240000);
  });
};

