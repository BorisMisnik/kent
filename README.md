kent.com.ua
====================

Configure apache
Enable two modules mod_proxy and mod_proxy_http. After add virtual host:

```
Example:

<VirtualHost 127.0.0.1>
    ServerAdmin admin@admin.com
    ServerName kent.com.ua
    ServerAlias www.kent.com.ua
 
    ProxyRequests off
 
    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>
 
    <Location />
        ProxyPass http://localhost:8081/
        ProxyPassReverse http://localhost:8081/
    </Location>
</VirtualHost>

```
Run kent-admin in ./config.json service must be "http://localhost:8000". After run nodejs

```
npm install
node app.js

```
browse kent.com.ua
