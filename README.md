# Iceswap
This is a dapp that help the users to.
- Swap to a lot of tokens using polygon network
- Buy crypto using fiat
- Cross-Chain to change different types of crypto

# Things for the future implementations
- HoneypotChecker
- Scoring Security ... based in tokenSniffer, honeypotapi and coinmarketcap values
- Add or own token "IceToken" ready for buy in the frontend ( the token already exist )
- Launch the Cross-chain integration to live
- Launch the fiat method to live

# Tecnologies used
- Moralis ( good for easy implementation )
- Onramper ( for buy crypto currency from fiat currency )
- 1inch exchange ( for swap to any token using polygon network )
- RenJs-v3 ( multichain )
- NextJs
- honeypotapi
- coinmarketcap api
- Web3

Project tasks for IceSwap in github : https://github.com/users/kypanz/projects/5

Images of the project in the end section ( we are working in a paralell repository to do iceswap, so not all can be here )

# Requirements for this app
node v16.15.1
npm 8.11.0

# How to install
npm install

# How to run
npm run dev

# Iceswap use Moralis
We use moralis servers with respective plugins to give a final user a more easy way to do things

# .env example ( needed before deploy )
```javascript
NEXT_PUBLIC_INFURA_URL_TESTNET=your infura api
GENERATE_SOURCEMAP=false
NEXT_PUBLIC_APP_ID=Your Moralis app id
NEXT_PUBLIC_SERVER_URL=Your Moralis app url
```

# Fixing possible bugs ( we still fixing possible bugs )

Error like :

```bash
Unhandled Runtime Error
TypeError: Right-hand side of 'instanceof' is not callable
```

If this happend you need to downgrade the moralis package versions
take a look here => https://forum.moralis.io/t/solved-typeerror-right-hand-side-of-instanceof-is-not-callable/18621


If the exchange page dont load the data, please reload the page

------


# Some images of the project

Swap token ( page working )
![image](https://user-images.githubusercontent.com/37570367/186028863-91a9df80-9f8d-4d9a-8d95-d18414ca0996.png)

Buy crypto from fiat ( page working )
![image](https://user-images.githubusercontent.com/37570367/186029092-77699513-92b5-4d2d-b351-3edb5da9475b.png)

Main page ( working hard to be done )
![image](https://user-images.githubusercontent.com/37570367/186028912-6f4421de-17d4-4c5e-bc90-6c8c018b2eb6.png)

List New token ( working hard to be done, future implementation )
![image](https://user-images.githubusercontent.com/37570367/186029025-45c3f280-4184-43ac-a09e-22e9f12c5624.png)

Cross-chain ( working hard to be done )
![image](https://user-images.githubusercontent.com/37570367/186029966-a811b4e2-25c7-42ad-88e7-01f9e12b5016.png)

we have a lot of pages there, but is not a good idea upload all images here ...

have a nice day :heart:
