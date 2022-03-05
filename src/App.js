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

const preferences = {
  colors: {
    mode: 'dark',
    highlight: 'purple',
    font: '#131313,',
  },
  cookies: {
    accept: 'strictly-necessary',
  },
};

const getPreferences = () => {
  return preferences
}

function App() {

  const [characters, setCharacters] = useState([])
  const [isDarkMode, setIsDarkMode] = useState();
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  useEffect(() => {

    Axios.get('https://rickandmortyapi.com/api/character/').then(res => {
    console.log(getPreferences())
    setCharacters(() => res.data.results)

    const {colors, cookies} = getPreferences()

    setIsDarkMode(() => colors.mode === "dark")
    
    switcher({ theme: colors.mode === "dark" ? themes.dark : themes.light });

    })
  }, [])


  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }
  


  return (
    <div className="App">
      <h1>MICK AND RORTY</h1>
      <h3>Demo</h3>
      <Space align='baseline'>
        <Space direction="vertical">
        {
          characters.slice(0, 7).map(character => {
              return (
                <Badge.Ribbon text={character.species}>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Title level={4}>{character.name}</Title>
                  <Title level={5}>{character.type}</Title>
                </Card>
                </Badge.Ribbon>
              )
            
          })
        }
        </Space>
        <Space direction="vertical">
        {
          characters.slice(7, 14).map(character => {
              return (
                <Badge.Ribbon text={character.species}>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Title level={4}>{character.name}</Title>
                  <Title level={5}>{character.type}</Title>
                </Card>
                </Badge.Ribbon>
              )
            
          })
        }
        </Space>
        <Space direction="vertical">
        {
          characters.slice(14, characters.length).map(character => {
              return (
                <Badge.Ribbon text={character.species}>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Title level={4}>{character.name}</Title>
                  <Title level={5}>{character.type}</Title>
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
