import React from "react"
import { Monitor , Users , Database , Package } from "react-feather"

import Card_AS from "../assets/img/poker/card-1/AS.png"
import Card_KS from "../assets/img/poker/card-1/KS.png"
import Card_QS from "../assets/img/poker/card-1/QS.png"
import Card_JS from "../assets/img/poker/card-1/JS.png"
import Card_TS from "../assets/img/poker/card-1/TS.png"
import Card_9S from "../assets/img/poker/card-1/9S.png"
import Card_8S from "../assets/img/poker/card-1/8S.png"
import Card_7S from "../assets/img/poker/card-1/7S.png"
import Card_6S from "../assets/img/poker/card-1/6S.png"
import Card_5S from "../assets/img/poker/card-1/5S.png"
import Card_4S from "../assets/img/poker/card-1/4S.png"
import Card_3S from "../assets/img/poker/card-1/3S.png"
import Card_2S from "../assets/img/poker/card-1/2S.png"
import Card_AH from "../assets/img/poker/card-1/AH.png"
import Card_KH from "../assets/img/poker/card-1/KH.png"
import Card_QH from "../assets/img/poker/card-1/QH.png"
import Card_JH from "../assets/img/poker/card-1/JH.png"
import Card_TH from "../assets/img/poker/card-1/TH.png"
import Card_9H from "../assets/img/poker/card-1/9H.png"
import Card_8H from "../assets/img/poker/card-1/8H.png"
import Card_7H from "../assets/img/poker/card-1/7H.png"
import Card_6H from "../assets/img/poker/card-1/6H.png"
import Card_5H from "../assets/img/poker/card-1/5H.png"
import Card_4H from "../assets/img/poker/card-1/4H.png"
import Card_3H from "../assets/img/poker/card-1/3H.png"
import Card_2H from "../assets/img/poker/card-1/2H.png"
import Card_AD from "../assets/img/poker/card-1/AD.png"
import Card_KD from "../assets/img/poker/card-1/KD.png"
import Card_QD from "../assets/img/poker/card-1/QD.png"
import Card_JD from "../assets/img/poker/card-1/JD.png"
import Card_TD from "../assets/img/poker/card-1/TD.png"
import Card_9D from "../assets/img/poker/card-1/9D.png"
import Card_8D from "../assets/img/poker/card-1/8D.png"
import Card_7D from "../assets/img/poker/card-1/7D.png"
import Card_6D from "../assets/img/poker/card-1/6D.png"
import Card_5D from "../assets/img/poker/card-1/5D.png"
import Card_4D from "../assets/img/poker/card-1/4D.png"
import Card_3D from "../assets/img/poker/card-1/3D.png"
import Card_2D from "../assets/img/poker/card-1/2D.png"
import Card_AC from "../assets/img/poker/card-1/AC.png"
import Card_KC from "../assets/img/poker/card-1/KC.png"
import Card_QC from "../assets/img/poker/card-1/QC.png"
import Card_JC from "../assets/img/poker/card-1/JC.png"
import Card_TC from "../assets/img/poker/card-1/TC.png"
import Card_9C from "../assets/img/poker/card-1/9C.png"
import Card_8C from "../assets/img/poker/card-1/8C.png"
import Card_7C from "../assets/img/poker/card-1/7C.png"
import Card_6C from "../assets/img/poker/card-1/6C.png"
import Card_5C from "../assets/img/poker/card-1/5C.png"
import Card_4C from "../assets/img/poker/card-1/4C.png"
import Card_3C from "../assets/img/poker/card-1/3C.png"
import Card_2C from "../assets/img/poker/card-1/2C.png"

import avatar from "../assets/img/avatar/avatar.jpg"
import pane from "../assets/img/poker/poker-pane.png"
import back from "../assets/img/poker/card-back/back2.jpg"

const pokerConfig = {
    navData : [
      {
        icon : <Monitor className="poker-navheader-icon1"/>,
        name : "Games"
      },
      {
        icon : <Users className="poker-navheader-icon1" />,
        name : "Seats"
      },
      {
        icon : <Database className="poker-navheader-icon1" />,
        name : "Stakes"
      },
      {
        icon : <Package className="poker-navheader-icon1" />,
        name : "Other"
      },
    ],
    tableHeader : [
      {name : "Name"},
      {name : "Game"},
      {name : "Type"},
      {name : "Stakes"},
      {name : "Players"},
      {name : "Seeing"},
    ],
    selectGameBig : [
      {id : 1 , name : "CASH GAMES"},
      {id : 2 ,name : "SPIN & GO"},
      {id : 3 ,name : "TOURNAMENTS"},
    ],
    roomType : [
      {id : 0 , name : "All" , checked : true},
      {id : 1 , name : "NL Holdem" , checked : true},
      {id : 2 , name : "PL Holdem" , checked : true},
      {id : 3 , name : "NL 6+ Holdem" , checked : true},
      {id : 4 , name : "PL Omaha" , checked : true},
      {id : 5 , name : "PL Five Card Omaha" , checked : true},
    ],
    footer : [
      {id : 1 , name : "CHAT"},
      {id : 2 , name : "HANDS"},
    ],
    Cards : {
      "AS" : Card_AS ,
      "KS" : Card_KS ,
      "QS" : Card_QS ,
      "JS" : Card_JS ,
      "TS" : Card_TS ,
      "9S" : Card_9S ,
      "8S" : Card_8S ,
      "7S" : Card_7S ,
      "6S" : Card_6S ,
      "5S" : Card_5S ,
      "4S" : Card_4S ,
      "3S" : Card_3S ,
      "2S" : Card_2S ,
      "AH" : Card_AH ,
      "KH" : Card_KH ,
      "QH" : Card_QH ,
      "JH" : Card_JH ,
      "TH" : Card_TH ,
      "9H" : Card_9H ,
      "8H" : Card_8H ,
      "7H" : Card_7H ,
      "6H" : Card_6H ,
      "5H" : Card_5H ,
      "4H" : Card_4H ,
      "3H" : Card_3H ,
      "2H" : Card_2H ,
      "AD" : Card_AD ,
      "KD" : Card_KD ,
      "QD" : Card_QD ,
      "JD" : Card_JD ,
      "TD" : Card_TD ,
      "9D" : Card_9D ,
      "8D" : Card_8D ,
      "7D" : Card_7D ,
      "6D" : Card_6D ,
      "5D" : Card_5D ,
      "4D" : Card_4D ,
      "3D" : Card_3D ,
      "2D" : Card_2D ,
      "AC" : Card_AC ,
      "KC" : Card_KC ,
      "QC" : Card_QC ,
      "JC" : Card_JC ,
      "TC" : Card_TC ,
      "9C" : Card_9C ,
      "8C" : Card_8C ,
      "7C" : Card_7C ,
      "6C" : Card_6C ,
      "5C" : Card_5C ,
      "4C" : Card_4C ,
      "3C" : Card_3C ,
      "2C" : Card_2C ,
    },
    avatar : {
      "avatar" : avatar,
    },
    pane : pane,
    back : back,
}

export default pokerConfig;