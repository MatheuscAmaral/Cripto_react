import './notfound.css'
import { Link } from 'react-router-dom'


export function NotFound() {
    return(
        <div className="notFound">
            <h4>Página não encontrada</h4>
            <img src="/src/assets/undraw_page_not_found_re_e9o6.svg" alt="imagem erro 404"  className='img'/>
            <button>
                <Link to='/' className='backHome'>
                    Acessar cripto moedas
                </Link>
            </button>
        </div>
    )
}