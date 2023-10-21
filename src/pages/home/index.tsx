import { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import style from './home.module.css';
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';



interface CoinProps {
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;
}


interface DataProps {
    coins: CoinProps[];
}
export function Home() {
    
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        function getData() {
            fetch(`https://sujeitoprogramador.com/api-cripto/?key=b334044337509c83&pref=BRL`)
            .then((Response) => Response.json())
            .then((data: DataProps) => {
                let coinsData = data.coins.slice(0, 15);
                
                let price = Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL"
                })
                
                const formatResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap))
                    }

                    return formated;
                })
                
                {coins}
                
                setCoins(formatResult);
                setLoading(false);
            })
            
        }

        getData();
    }, [])
    
    
    function handleSearch(e: FormEvent) {
        e.preventDefault();
        
        if(inputValue === "") return;
    
        else {
            navigate(`/detail/${inputValue}`)
        }
    }

    if(loading) {
        return(
            <div className={style.center}>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                    <h6>Carregando...</h6>
            </div>
        )
    }
    

    return (
        <main className={style.container} id='main'>
            <form className={style.form} onSubmit={handleSearch}>
                <input
                 placeholder='Digite o simbolo da moeda: BTC...'
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                />
                <button type='submit'>
                    <BiSearch size={23} color="#fff" />
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    {
                        coins.map(coin => (
                            <tr key={coin.name} className={style.tr}>
                                <td className={style.tdLabel} data-label="Moeda">
                                    <Link className={style.Link} to={`/detail/${coin.symbol}`}>
                                        <span>{coin.name}</span> | {coin.symbol}
                                    </Link>
                                </td>
                                <td className={style.tdLabel} data-label="Mercado">
                                    {coin.formatedMarket}
                                </td>
                                <td className={style.tdLabel} data-label="Preço">
                                    {coin.formatedPrice}
                                </td>
                                <td className={Number(coin?.delta_24h) >= 0 ? style.tdProfit : style.tdLoss } data-label="Volume">
                                    <span>{coin.delta_24h}</span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    );
}
