import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { MotoBoyComponent } from './_components/moto-boy/moto-boy.component';
import { ListarMotoBoyComponent } from './_components/moto-boy/listar-moto-boy/listar-moto-boy.component';
import { ProdutoComponent } from './_components/produto/produto.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'motoBoy/:id', component: MotoBoyComponent },
    { path: 'motoBoy', component: MotoBoyComponent },
    { path: 'listarMotoBoy', component: ListarMotoBoyComponent },
    { path: 'listarMotoBoy/:isExcluido', component: ListarMotoBoyComponent },    
    { path: 'produto', component: ProdutoComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);