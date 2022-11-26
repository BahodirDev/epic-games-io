
import React, { useEffect, useState } from "react";
import SelectedPackege from "./components/cards/SelectedPackege";
import ShopBag from "./components/cards/ShopBag";
import Home from "./components/Home";
import Navbar from "./layouts/Navbar";
import  { Toaster } from 'react-hot-toast';

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [limit, setLimit] = useState(12);
  const [shop, setShop] = useState({ isShop: false, status: '' });
  const [posts, setPosts] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    loadingApi()
  }, []);

  const loadingApi = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'string',
        'X-RapidAPI-Key': '2b93e030a1msh1f83bdaa18b25dcp1d2732jsn60aaf549e241',
        'X-RapidAPI-Host': 'fortnite1.p.rapidapi.com'
      }
    };

    await fetch('https://fortnite1.p.rapidapi.com/store/get', options)
      .then(response => response.json())
      .then(res => {
        setData(res.data)
        setData2(res.data)
      })
      .catch(err => console.error(err));
  }

  const getLimit = (limit) => {
    setLimit(limit)
  }

  const getValue = (search) => {

    let newMass = data.filter(s => s.item.name === search);
    if (newMass.length) {
      setData2(newMass)
    } else {
      setData2(data)

    }
  }

  const getShop = (obj, status) => {
    if (status == 'shop') {
      let isExist = posts.some(s => s.id === obj.id);
      if (isExist) {
        let newMass = posts.map((item) => {
          if (item.id === obj.id) {
            return {
              ...item,
              miqdor: item.miqdor + 1
            }
          } else {
            return item
          }
        })
        setPosts(newMass)
      } else {
        setPosts([...posts, { ...obj, miqdor: 1 }]);
      }
    } else {
      // Card section

      let isExist = cards.some(s => s.id === obj.id);
      if (isExist) {
        let newMass = cards.map((item) => {
          if (item.id === obj.id) {
            return {
              ...item,
              miqdor: item.miqdor + 1
            }
          } else {
            return item
          }
        })
        setCards(newMass)
      } else {
        setCards([...cards, { ...obj, miqdor: 1 }]);
      }


    }



  }

  function removeList(id, status) {
    if (status == 'shop') {
      let newMass = posts.filter(s => s.id !== id);
      setPosts(newMass)
    } else {
      let newMass = cards.filter(s => s.id !== id);
      setCards(newMass)
    }

  }

  const openCard = (status) => {
    setShop({ status, isShop: true })
  }

  function convertToShop(obj) {
    
    let isExist = posts.some(s => s.id === obj.id);
    if (isExist) {
      let newMass = posts.map((item) => {
        if (item.id === obj.id) {
          return {
            ...item,
            miqdor: item.miqdor + 1
          }
        } else {
          return item
        }
      })
      setPosts(newMass)
    } else {
      setPosts([...posts, { ...obj, miqdor:obj.miqdor }]);
    }
    let newMass = cards.filter(s=>s.id !==obj.id);
    setCards(newMass)
  }

  return (
    <div className="">
       <Toaster />
      <Navbar
        getValue={getValue}
        getLimit={getLimit}
        openCard={openCard}
      />
      <Home
        getShop={getShop}
        limit={limit}
        data={data2}
      />
      {
        shop.status == 'shop' && shop.isShop &&
        <ShopBag
          posts={posts}
          setShop={setShop}
          removeList={removeList}
        />
      }
      {
        shop.status == 'card' && shop.isShop &&
        <SelectedPackege
          cards={cards}
          setShop={setShop}
          removeList={removeList}
          convertToShop={convertToShop}
        />
      }
    </div>
  );
}

export default App;
