/*jsl:declare jasmine*/
function readFixtures()
{
  return jasmine.getFixtures()._proxyCallTo('read', arguments);
}

function loadFixtures()
{
  console.log("Fixtures#loadFixtures");
  jasmine.getFixtures()._proxyCallTo('load', arguments);
}

function setFixtures(html)
{
  console.log("jasmine#setFixtures");
  jasmine.getFixtures().set(html);
}

function sandbox(attributes)
{
  return jasmine.getFixtures().sandbox(attributes);
}

jasmine.getFixtures = function()
{
  console.log("jasmine#getFixtures");
  jasmine._currentFixtures = jasmine._currentFixtures || new jasmine.Fixtures();
  console.log(jasmine._currentFixtures);
  return jasmine._currentFixtures
}

jasmine.Fixtures = function()
{
  console.log("jasmine.Fixtures");
  this.containerId = 'jasmine-fixtures';
  console.log("_fixturesCache set to {}");
  this._fixturesCache = {};
}

jasmine.Fixtures.XHR= window.XMLHttpRequest || (function(){
  var progIdCandidates= ['Msxml2.XMLHTTP.4.0', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP'];
  var len= progIdCandidates.length;

  var progId;
  var xhr;
  
  function ConstructXhr()
  {
    return new window.ActiveXObject(ConstructXhr.progId);
  }
  
  while (len--)
  {
    try
    {
      progId= progIdCandidates[len];
      xhr= new window.ActiveXObject(progId);
      //  ActiveXObject constructor throws an exception
      //  if the component isn't available.
      xhr= null;
      ConstructXhr.progId= progId;
      return ConstructXhr;
    }
    catch (e)
    {
      //  Ignore the error
    }
  }
  throw new Error('No XMLHttpRequest implementation found');
})();

jasmine.Fixtures.prototype= {

  set: function(html)
  {
    console.log("jasmine.Fixtures.prototype=#set");
    this.cleanUp();
    this._createContainer(html);
  },

  load: function()
  {
    console.log("jasmine.Fixtures.prototype=#load");
    this.cleanUp();
    this._createContainer(this.read.apply(this, arguments));
  },

  read: function()
  {
    console.log("jasmine.Fixtures.prototype=#read");
    var htmlChunks = [];

    var fixtureUrls = arguments;
    for (var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {
      htmlChunks.push(this._getFixtureHtml(fixtureUrls[urlIndex]));
    };
    return htmlChunks.join('');
  },

  clearCache: function()
  {
    this._fixturesCache = {};
  },

  cleanUp: function()
  {
    var container= document.getElementById(this.containerId);
    if (container)
      container.parentNode.removeChild(container);
  },

  sandbox: function(attributes)
  {
    var attributesToSet = attributes || {};
    var sandbox= document.createElement('div');
    sandbox.id= 'sandbox';

    if ("string"===typeof(attributes))
    {
      sandbox.innerHTML= attributes;
      if (1===sandbox.childNodes.length && 1===sandbox.firstChild.nodeType)
      {
        sandbox= sandbox.firstChild;
        if (!sandbox.id)
          sandbox.id= 'sandbox';
      }
      return sandbox;
    }
    
    for (var attr in attributesToSet)
      sandbox.setAttribute(attr, attributesToSet[attr]);

    return sandbox;
  },

  _createContainer: function(html)
  {
    console.log("jasmine.Fixtures.prototype=#_createContainer");
    var container = document.createElement('div');
    container.id= this.containerId;
    
    if (html && html.nodeType===1){
      container.appendChild(html);
    }
    else {
      container.innerHTML= html;
    };
    document.body.appendChild(container);
  },

  _getFixtureHtml: function(url)
  { 
    console.log("jasmine.Fixtures.prototype=#_getFixtureHtml");
    console.log("url");
    console.log(url);
    if (url in this._fixturesCache){
      console.log("_fixturesCache");
      console.log(this._fixturesCache);
    }
    else {
      console.log("url not in cache... loading");
      console.log("_fixturesCache");
      console.log(this._fixturesCache);
      this._loadFixtureIntoCache(url);
    };
    if (url in this._fixturesCache){
      console.log("URL correctly in _fixturesCache");
    }
    else {
      console.log("URL still not present when it should be");
    };
    return this._fixturesCache[url];
  },

  _loadFixtureIntoCache: function(url)
  {
    console.log("jasmine.Fixtures.prototype-#_loadFixturesIntoCache");
    console.log("this._fixturesCache");
    console.log(this._fixturesCache);
    var my = this;
    console.log("my._fixturesCache");
    console.log(my._fixturesCache);
    var xhr = new jasmine.Fixtures.XHR();
    xhr.open('GET', url, false);
    
    xhr.onreadystatechange= function()
    {
      if (4!==xhr.readyState){
        console.log("xhr not in readyState");
        return;
      };
      var status= xhr.status;
      console.log("xhr.status");
      console.log(xhr.status);
      var succeeded= 0===status || (status>=200 && status<300) || 304==status;
      
      if (!succeeded){
        throw new Error('Failed to load resource: status=' + status + ' url=' + url);
      };
      console.log("xhr.responseText");
      console.log(xhr.responseText);
      my._fixturesCache[url]= xhr.responseText;  
      console.log("my._fixturesCache");
      console.log(my._fixturesCache);
      xhr.onreadystatechange= null;
      xhr= null;
    }
    console.log("my._fixturesCache");
    console.log(my._fixturesCache);
    xhr.send(null);
  },

  _proxyCallTo: function(methodName, passedArguments)
  {
    console.log("jasmine.Fixtures.prototype=#_proxyCallTo");
    return this[methodName].apply(this, passedArguments);
  }
  
};
