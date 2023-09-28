var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'HTML to PDF server', 
  description: 'Server Node js', 
  script: '\\server.js'
  // script: 'workspaces\\SH_project\\server.js'
  //script: 'C:\\Users\\Olvo-PC\\Desktop\\Informatica\\SH\\Nueva carpeta\\SH_project\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){  //uninstall 
  svc.start();                //console.log("Uninstalled");
});

svc.install();              //uninstall