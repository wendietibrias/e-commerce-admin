import { Routes,Route } from 'react-router-dom';
import { 
  MainDashboard,
  Login,
  Dashboard, 
  Products,
  Categories, 
  CreateCategories,
  CreateProducts,
  UpdateProducts, 
  UpdateCategories,
  Banners,
  CreateBanners,
  UpdateBanners, 
  Profile
} from './pages';

const App = () => {
  return (
    <div className="App">
       <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/" element={<MainDashboard/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/create" element={<CreateProducts/>}/>
            <Route path="products/update/:id" element={<UpdateProducts/>}/>
            <Route path="categories" element={<Categories/>}/>
            <Route path="categories/create" element={<CreateCategories/>}/>
            <Route path="categories/update/:id" element={<UpdateCategories/>}/>
            <Route path="banners" element={<Banners/>}/>
            <Route path="banners/create" element={<CreateBanners/>}/>
            <Route path="banners/update/:id" element={<UpdateBanners/>}/>
            <Route path="/profile" element={<Profile/>}/>
         </Route>
       </Routes>
    </div>
  );
}

export default App;
