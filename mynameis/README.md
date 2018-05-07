# mynameis.

### 1. What is it?

mynameis. — is a nebulas based decentralized application with userfriendly interface, that solves the problem of registering unique nicknames in the space of the Nebulas' blockchain. Using this application, users can register their nickname, thereby prohibiting other users from using their nickname.


### 2. Functions of mynameis.
```
(1) Registration of a unique nickname.
(2) Searching for the owner of the nickname.
(3) Searching for the nickname using the nebulas user's address.
(4) Changing your nickname.
(5) Deleting your nickname.
```

### 3. Smart Contract Instructions for Use

Contract address: n233msrZLUNe3VRuXwUvpymftX1Q4uHNTNM

#### 3.1 Using `getNameOf`

Function, that searches if nickname is registered and if it is, you will get nebulas address of the owner. The argument is a sring, for example: "nebulasFan_228"

To call a smart contract function you should just enter a nickname in 1 word:
```js
["nebulasFan_228"]
```

The function validating strings that have more than 1 symbol. And also you should know, that "nebulasFan_228" is the same that "NEBULASFAN_228".

#### 3.2 `getAddressOf`
 
The same function as previous, but it gets as an argument a nebulas address, and search did the user register name or not. In output you will get the user's nickname. 

To call a smart contract function you should just enter an address in 1 word:
```js
["n1ZU1WSZHmcJbeJbWHKcMQdP6vM15Q56qdZ"]
```

#### 3.3 `addName`
 
This function requiers a string, that will be your nickname.

To call a smart contract function you should just enter an address in 1 word:
```js
["nebulasFan_228"]
```

#### 3.4 `changeName`
 
This function allows you to change your nickname. Your previous nickname will be deleted.

To call a smart contract function you should just enter a new name in 1 word:
```js
["nebulasFan_1337"]

```
#### 3.4 `deleteName`
 
This function allows you to delete your nickname. No arguments needed.

#### 3.5 `getNamesCount`
 
This function allows you to get a number of all registered nicknames. No arguments needed.

### Links

- Nebulas: https://nebulas.io/
- mynameis: http://thesheepman.github.io/mynameis/
- Code: https://t.me/andrewtaw
- Design: https://t.me/igormathewshonok