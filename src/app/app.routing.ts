import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { MotoBoyComponent } from './_components/moto-boy/moto-boy.component';
import { ListarMotoBoyComponent } from './_components/moto-boy/listar-moto-boy/listar-moto-boy.component';
import { ProdutoComponent } from './_components/produto/produto.component';
import { ClienteComponent } from './_components/cliente/cliente.component';
import { ListarClienteComponent } from './_components/cliente/listar-cliente/listar-cliente.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'motoBoy/:id', component: MotoBoyComponent },
    { path: 'motoBoy', component: MotoBoyComponent },
    { path: 'listarMotoBoy', component: ListarMotoBoyComponent },
    { path: 'produto', component: ProdutoComponent },
    { path: 'cliente/:id', component: ClienteComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'listarCliente', component: ListarClienteComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);