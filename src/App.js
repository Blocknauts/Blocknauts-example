import logo from './logo.svg';
import './App.css';
import { useThemeSwitcher } from "react-css-theme-switcher";


import { Card, Badge, Space, Switch, Input } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';

import { useEffect, useState } from 'react';
import Axios from 'axios'

const { Title } = Typography;

const { Meta } = Card;

function App() {

  const [characters, setCharacters] = useState([])
  const [isDarkMode, setIsDarkMode] = useState("light");
  const [fontColor, setFontColor] = useState("")
  const [currentAccount, setCurrentAccount] = useState("");
  const [updatePending, setUpdatePending] = useState(false);

  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const checkIfWalletIsConnected = async () => {

    const { ethereum } = window

    if (!ethereum) {
      console.log("1")
      return
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    if (accounts.length !== 0) {
      console.log("3")
      const account = accounts[0];

      setCurrentAccount(account);
      return account
    }
  }

  const fetchData = async () => {
    const data = await Axios.get('https://rickandmortyapi.com/api/character/')
    setCharacters(() => data.data.results)
    return data
  }

  const preference_fetcher = async (account) => {
    const token_uri = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIwNmUyNjQ1MTc2NzM2N2IyNEMwYUI3MGFGOWM1MDdCOENCYTU0QjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDY1ODg2ODc0MzcsIm5hbWUiOiJibG9ja25hdXQifQ.MQPri8qK1v4jE6i7U8IJf_N3oWm3n-I0bMZlrU4LLBk"
    const res = await window.w3preferences.getPreferences(account, token_uri).catch(err => console.log(err))
    return res;
  }

  useEffect(() => {
    checkIfWalletIsConnected().then((account) => {
      console.log(account);
      preference_fetcher(account)
        .then((res) => {
          setIsDarkMode(res.theme.colorMode === "dark" ? true: false);
          switcher({ theme: res.theme.colorMode === "dark" ? themes.dark : themes.light });
          setFontColor(res.theme.fontColor);
        })
        .catch(console.error)
      fetchData()
        .catch(console.error);
    })
  }, []);


  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }

  return (
    <div className="App">
      <h1 style={{color: fontColor }}>MICK AND RORTY</h1>
      <h3 style={{color: fontColor }}>Demo</h3>
      <Space align='baseline'>
        <Space style={{margin: 15}} direction="vertical">
        {
          characters.slice(0, 7).map(character => {
              return (
                <Badge.Ribbon text={character.species}>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Title style={{color: fontColor }} level={4}>{character.name}</Title>
                  <Title style={{color: fontColor }} level={5}>{character.type}</Title>
                </Card>
                </Badge.Ribbon>
              )
            
          })
        }
        </Space>
        <Space direction="vertical" style={{margin: 15}}>
        {
          characters.slice(7, 14).map(character => {
              return (
                <Badge.Ribbon text={character.species}>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Title style={{color: fontColor }} level={4}>{character.name}</Title>
                  <Title style={{color: fontColor }} level={5}>{character.type}</Title>
                </Card>
                </Badge.Ribbon>
              )
            
          })
        }
        </Space>
        <Space direction="vertical" style={{margin: 15}}>
        {
          characters.slice(14, characters.length).map(character => {
              return (
                <Badge.Ribbon style={{color: fontColor }} text={character.species}>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Title style={{color: fontColor }} level={4}>{character.name}</Title>
                  <Title style={{color: fontColor }} level={5}>{character.type}</Title>
                </Card>
                </Badge.Ribbon>
              )
            
          })
        }
        </Space>
      </Space>      

    </div>
  );
}

export default App;
