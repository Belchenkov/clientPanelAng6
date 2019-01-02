import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/Client";
import { SettingsService } from "../../services/settings.service";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Пожалуйста, заполните все поля корректно!', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add id to client
      value.id = this.id;
      // Update Client
      this.clientService.updateClient(value);
      this.flashMessage.show('Данные о клиенте обновлены', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate([`/client/${this.id}`])
    }
  }

}
