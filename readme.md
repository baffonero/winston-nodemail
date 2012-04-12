# winston-nodemail

A email transport for [winston][0], borrowed almost entirely from [winston-mail][1], thanks [wavded](https://github.com/wavded).

This fork simply switches the email layer from [emailjs](https://github.com/eleith/emailjs) to [nodemailer](https://github.com/andris9/Nodemailer) because of an issue with [buffertools](https://github.com/bnoordhuis/node-buffertools), one of emailjs' dependencies.

## Installation

### Installing npm (node package manager)

``` sh
  $ curl http://npmjs.org/install.sh | sh
```

### Installing winston-nodemail

``` sh
  $ npm install winston
  $ npm install winston-nodemail
```

## Usage
``` js
  var winston = require('winston');

  //
  // Requiring `winston-mail` will expose
  // `winston.transports.Mail`
  //
  require('winston-nodemail').Mail;

  winston.add(winston.transports.Mail, options);
```

The Mail transport uses [nodemailer](https://github.com/andris9/Nodemailer) behind the scenes.  Options are the following:

* __to:__ The address(es) you want to send to. *[required]*
* __from:__ The address you want to send from. (default: `winston@[server-host-name]`)
* __host:__ SMTP server hostname (default: localhost)
* __port:__ SMTP port (default: 587 or 25)
* __username__ User for server auth
* __password__ Password for server auth
* __ssl:__ Use SSL (boolean or object { key, ca, cert })
* __tls:__ Boolean (if true, use starttls)
* __level:__ Level of messages that this transport should log.
* __silent:__ Boolean flag indicating whether to suppress output.

[0]: https://github.com/flatiron/winston
[1]: https://github.com/wavded/winston-mail