import {Route, Routes} from "react-router";
import {Layout} from "./pages/layout/Layout";
import {NewsPage} from "./pages/NewsPage";
import {BrowserRouter} from "react-router-dom";
import {ThemePage} from "./pages/ThemePage";
import {ThemeContextProvider} from "./ThemeContextProvider";
import {useEffect, useState} from "react";
import {MediaContextProvider, useMedia} from "./MediaContextProvider";

export type TitleName = 'Новости' | 'Темы'

function App() {
    const [title, setTitle] = useState<TitleName>('Новости')
    const isMobile = useMedia(760);

    useEffect(() => {
        document.querySelector('html')?.style.setProperty('font-size', isMobile ? '1.5em' : '1em')
    }, [isMobile])

    return (
        <MediaContextProvider maxWidth={760}>
            <ThemeContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout title={title}/>}>
                            <Route index element={<NewsPage onStart={() => setTitle('Новости')}/>}/>
                            <Route path='theme' element={<ThemePage onStart={() => setTitle('Темы')}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeContextProvider>
        </MediaContextProvider>
    )
}

export default App;
