# Ok:mail

### 1. What is it?

Ok:mail is a new era crypto electronic mail for business. You are able to easily communicate with your friends, and partners.

Encryption, user-friendly interface and all features of new-era mailboxes included!

### 2. Smart Contract Instructions for Use

Contract address: n1gGBTN9a8zcvVGKpNMxSrvzM6i7YuNPaCh

#### 2.1 `createAccount`

Function, that creates your account. U have to enter your name. Example:
```js
["andrew"]
```
#### 2.2 `getAccount`
 
This function returns your account name if u have registered it. No arguments needed.

#### 2.3 `removeAccount`
 
This function delete your account with all your mail and data. No arguments needed.

#### 2.4 `sendMessage`
 
Function, that allows you send messages. U have to enter recipient okmail, title and text. Example:
```js
["andrew@okmail, "Important thing", "In nebulas we trust!"]
```

#### 2.5 `loadMail`
 
This function returns all your mail. No arguments needed.

#### 2.6 `delMsgById`

Function, that allows you to delete message. U have to enter message id. Example:
```js
["1"]
```

#### 2.7 `toggleSpamById`

Function, that allows you to mark message as spam. U have to enter message id. Example:
```js
["1"]
```

#### 2.8 `toggleMarkById`

Function, that allows you to mark message as important. U have to enter message id. Example:
```js
["1"]
```

#### 2.8 `addContact`

Function, that allows you to add contact into your contactsbook. U have to enter okmail. Example:
```js
["partner@okmail"]
```

#### 2.9 `removeContact`

Function, that allows you to remove contact from your contactsbook. U have to enter okmail. Example:
```js
["partner@okmail"]
```

#### 2.10 `getContacts`

This function returns list of your contacts. No arguments needed.

### Links

- Nebulas: https://nebulas.io/
- Ok:topus: http://thesheepman.github.io/okmail