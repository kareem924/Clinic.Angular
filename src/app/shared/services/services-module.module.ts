import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from 'src/app/shared/services/core/TokenStorageService.service';
import { IdentityServerService } from 'src/app/shared/services/auth-service/identity-server.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [TokenStorageService, IdentityServerService],
  declarations: [],
  exports: []
})
export class ServicesModuleModule { }
