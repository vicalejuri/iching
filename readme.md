# Readme

A simple I-ching divination app made with ES6+ , React and Redux.

![alt tag](https://raw.githubusercontent.com/barrabinfc/react-iching/master/src/constants/screenshots/play.png)
![alt tag](https://raw.githubusercontent.com/barrabinfc/react-iching/master/src/constants/screenshots/all.png)
![alt tag](https://raw.githubusercontent.com/barrabinfc/react-iching/master/src/constants/screenshots/detail.png)

## Demo

https://barrabinfc.github.io/react-iching/

## Run

`npm install` to install dependencies
`gulp serve` to start a hot reload server

## Todo

- [ ] Implement 'iching of the day' based on chinese calendar
- [ ] Implement the 'moving lines' interpretation
- [ ] Fix ReactCSSTransitionGroup over PageTransition working.
- [ ] Fix touchTap not firing

- [ ] Add paper texture
- [ ] Change bell to a synthesis bell one.

- [ ] Add FB/Twitter sharing (meta tags, buttons and preview)

- [X] Implement the old method of Yarrow-stalks
- [X] Implement the 3 coin method
- [X] Add Header/Content/Footer in mobile format
- [X] Get the 64 Hexagrams interpretation from Richard Wilhelm
- [X] Get Portuguese hexagram interpretation
- [X] Create a Page using ListView where ListItem = hexagram (listPage)
- [X] Create a Page for showing each hexagram  (detailPage)
- [X] Fix iChing Image rendering (correct = kuas from bottom to up)
- [X] Fix Layout for Smartphones (width: 320px)

## info

### Trigrams

    [ 0, 0, 0 ] => { :name => "Ch'ien", :attribute => "Strong", :image => "Heaven", :relationship => "Father" },
    [ 1, 1, 1 ] => { :name => "K'un", :attribute => "Devoted, Yielding", :image => "Earth", :relationship => "Mother" },
    [ 1, 1, 0 ] => { :name => "Chen", :attribute => "Inciting, Movement", :image => "Thunder", :relationship => "First Son" },
    [ 1, 0, 1 ] => { :name => "K'an", :attribute => "Dangerous", :image => "Water", :relationship => "Second Son" },
    [ 0, 1, 1 ] => { :name => "Ken", :attribute => "Resting", :image => "Mountain", :relationship => "Third Son" },
    [ 0, 0, 1 ] => { :name => "Sun", :attribute => "Penetrating", :image => "Wind, Wood", :relationship => "First Daughter" },
    [ 0, 1, 0 ] => { :name => "Li", :attribute => "Light-giving", :image => "Fire", :relationship => "Second Daughter" },
    [ 1, 0, 0 ] => { :name => "Tui", :attribute => "Joyful", :image => "Lake", :relationship => "Third Daughter" },


### Hexagrams

    [ 0, 0, 0, 0, 0, 0 ] => { :name => "Ch'ien" },
    [ 0, 0, 0, 0, 0, 1 ] => { :name => "Kou" },
    [ 0, 0, 0, 0, 1, 0 ] => { :name => "T'ung Jen" },
    [ 0, 0, 0, 1, 0, 0 ] => { :name => "Lu" },
    [ 0, 0, 1, 0, 0, 0 ] => { :name => "Hsiao Ch'u" },
    [ 0, 1, 0, 0, 0, 0 ] => { :name => "Ta Yu" },
    [ 1, 0, 0, 0, 0, 0 ] => { :name => "Kuai" },
    [ 0, 0, 0, 0, 1, 1 ] => { :name => "Tun" },
    [ 0, 0, 0, 1, 1, 0 ] => { :name => "Wu Wang" },
    [ 0, 0, 1, 1, 0, 0 ] => { :name => "Chung Fu" },
    [ 0, 1, 1, 0, 0, 0 ] => { :name => "Ta Ch'u" },
    [ 1, 1, 0, 0, 0, 0 ] => { :name => "Ta Chuang" },
    [ 0, 0, 0, 1, 0, 1 ] => { :name => "Sung" },
    [ 0, 0, 1, 0, 1, 0 ] => { :name => "Chia Jen" },
    [ 0, 1, 0, 1, 0, 0 ] => { :name => "K'uei" },
    [ 1, 0, 1, 0, 0, 0 ] => { :name => "Hsu" },
    [ 0, 0, 1, 0, 0, 1 ] => { :name => "Sun" },
    [ 0, 1, 0, 0, 1, 0 ] => { :name => "Li" },
    [ 1, 0, 0, 1, 0, 0 ] => { :name => "Tui" },
    [ 0, 1, 0, 0, 0, 1 ] => { :name => "Ting" },
    [ 1, 0, 0, 0, 1, 0 ] => { :name => "Ko" },
    [ 1, 0, 0, 0, 0, 1 ] => { :name => "Ta Kuo" },
    [ 0, 0, 0, 1, 1, 1 ] => { :name => "P'i" },
    [ 0, 0, 1, 1, 1, 0 ] => { :name => "I" },
    [ 0, 1, 1, 1, 0, 0 ] => { :name => "Sun" },
    [ 1, 1, 1, 0, 0, 0 ] => { :name => "T'ai" },
    [ 0, 0, 1, 1, 0, 1 ] => { :name => "Huan" },
    [ 0, 1, 1, 0, 1, 0 ] => { :name => "Pi" },
    [ 1, 1, 0, 1, 0, 0 ] => { :name => "Kuei Mei" },
    [ 0, 0, 1, 0, 1, 1 ] => { :name => "Chien" },
    [ 0, 1, 0, 1, 1, 0 ] => { :name => "Shih Ho" },
    [ 1, 0, 1, 1, 0, 0 ] => { :name => "Chieh" },
    [ 0, 1, 1, 0, 0, 1 ] => { :name => "Ku" },
    [ 1, 1, 0, 0, 1, 0 ] => { :name => "Feng" },
    [ 0, 1, 0, 0, 1, 1 ] => { :name => "Lu" },
    [ 1, 0, 0, 1, 1, 0 ] => { :name => "Sui" },
    [ 1, 1, 0, 0, 0, 1 ] => { :name => "Heng" },
    [ 1, 0, 0, 0, 1, 1 ] => { :name => "Hsien" },
    [ 1, 0, 0, 1, 0, 1 ] => { :name => "K'un" },
    [ 1, 0, 1, 0, 0, 1 ] => { :name => "Ching" },
    [ 1, 0, 1, 0, 1, 0 ] => { :name => "Chi Chi" },
    [ 0, 1, 0, 1, 0, 1 ] => { :name => "Wei Chi" },
    [ 0, 0, 1, 1, 1, 1 ] => { :name => "Kuan" },
    [ 0, 1, 1, 1, 1, 0 ] => { :name => "I" },
    [ 1, 1, 1, 1, 0, 0 ] => { :name => "Lin" },
    [ 0, 1, 1, 1, 0, 1 ] => { :name => "Meng" },
    [ 1, 1, 1, 0, 1, 0 ] => { :name => "Meng I" },
    [ 0, 1, 1, 0, 1, 1 ] => { :name => "Ken" },
    [ 1, 1, 0, 1, 1, 0 ] => { :name => "Chen" },
    [ 0, 1, 0, 1, 1, 1 ] => { :name => "Chin" },
    [ 1, 0, 1, 1, 1, 0 ] => { :name => "Chun" },
    [ 1, 1, 1, 0, 0, 1 ] => { :name => "Sheng" },
    [ 1, 1, 0, 0, 1, 1 ] => { :name => "Hsiao Kuo" },
    [ 1, 0, 0, 1, 1, 1 ] => { :name => "Ts'ui" },
    [ 1, 0, 1, 1, 0, 1 ] => { :name => "K'an" },
    [ 1, 0, 1, 0, 1, 1 ] => { :name => "Chien" },
    [ 1, 1, 0, 1, 0, 1 ] => { :name => "Hsieh" },
    [ 1, 1, 1, 1, 1, 0 ] => { :name => "Fu" },
    [ 1, 1, 1, 1, 0, 1 ] => { :name => "Shih" },
    [ 1, 1, 1, 0, 1, 1 ] => { :name => "Ch'ien" },
    [ 1, 1, 0, 1, 1, 1 ] => { :name => "Yu" },
    [ 1, 0, 1, 1, 1, 1 ] => { :name => "Pi" },
    [ 0, 1, 1, 1, 1, 1 ] => { :name => "Po" },
    [ 1, 1, 1, 1, 1, 1 ] => { :name => "K'un" },
