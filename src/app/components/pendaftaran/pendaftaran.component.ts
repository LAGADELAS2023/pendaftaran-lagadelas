import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pendaftaran',
  templateUrl: './pendaftaran.component.html',
  styleUrl: './pendaftaran.component.css'
})
export class PendaftaranComponent {

  kwaran = [
    { VALUE: 'KWARRAN SEMARANG UTARA', LABEL: 'SEMARANG UTARA' },
    { VALUE: 'KWARRAN SEMARANG TIMUR', LABEL: 'SEMARANG TIMUR' },
    { VALUE: 'KWARRAN SEMARANG SELATAN', LABEL: 'SEMARANG SELATAN' },
    { VALUE: 'KWARRAN SEMARANG TENGAH', LABEL: 'SEMARANG TENGAH' },
    { VALUE: 'KWARRAN SEMARANG BARAT', LABEL: 'SEMARANG BARAT' },
    { VALUE: 'KWARRAN TUGU', LABEL: 'TUGU' },
    { VALUE: 'KWARRAN GAJAH MUNGKUR', LABEL: 'GAJAH MUNGKUR' },
    { VALUE: 'KWARRAN CANDISARI', LABEL: 'CANDISARI' },
    { VALUE: 'KWARRAN TEMBALANG', LABEL: 'TEMBALANG' },
    { VALUE: 'KWARRAN PEDURUNGAN', LABEL: 'PEDURUNGAN' },
    { VALUE: 'KWARRAN GUNUNGPATI', LABEL: 'GUNUNGPATI' },
    { VALUE: 'KWARRAN NGALIYAN', LABEL: 'NGALIYAN' },
    { VALUE: 'KWARRAN MIJEN', LABEL: 'MIJEN' },
    { VALUE: 'KWARRAN BANYUMANIK', LABEL: 'BANYUMANIK' },
    { VALUE: 'KWARRAN GAYAMSARI', LABEL: 'GAYAMSARI' },
    { VALUE: 'KWARRAN GENUK', LABEL: 'GENUK' }
  ];
  messages: Message[] = [];
  selectedKwaran = {
    VALUE: null,
    LABEL: null
  }
  pangkalan: string = '';
  no_wa: string = '';
  nama_pendaftar: string = '';
  bindampingPutra: string = '';
  bindampingPutri: string = '';
  regu_putra: string = '';
  regu_putri: string = '';
  anggota_p_1: string = '';
  anggota_p_2: string = '';
  anggota_p_3: string = '';
  anggota_p_4: string = '';
  anggota_p_5: string = '';
  anggota_p_6: string = '';
  anggota_p_7: string = '';
  anggota_p_8: string = '';
  anggota_l_1: string = '';
  anggota_l_2: string = '';
  anggota_l_3: string = '';
  anggota_l_4: string = '';
  anggota_l_5: string = '';
  anggota_l_6: string = '';
  anggota_l_7: string = '';
  anggota_l_8: string = '';
  username_putra: string = ''
  username_putri: string = ''
  password_putra: string = ''
  password_putri: string = ''


  constructor(
    private api: ApiService
  ) { }

  onInput() {
    const pangkalanFormatted = this.pangkalan.replace(/\s+/g, '_');
    this.username_putra = pangkalanFormatted + '_' + this.regu_putra;
    this.username_putri = pangkalanFormatted + '_' + this.regu_putri;
  }

  onKunciData() {
    const data = {
      "PANGKALAN": this.pangkalan,
      "NAMA_PENDAFTAR": this.nama_pendaftar,
      "KWARRAN": this.selectedKwaran.VALUE,
      "WHATSAPP": "081234567890",
      "IS_KUNCI": "0",
      "ANGGOTA": [
        {
          "NAMA_REGU": this.regu_putra,
          "NAMA_BINDAMPING_PUTRA": this.bindampingPutra,
          "NAMA_BINDAMPING_PUTRI": "",
          "ANGGOTA_1": this.anggota_l_1,
          "ANGGOTA_2": this.anggota_l_2,
          "ANGGOTA_3": this.anggota_l_3,
          "ANGGOTA_4": this.anggota_l_4,
          "ANGGOTA_5": this.anggota_l_5,
          "ANGGOTA_6": this.anggota_l_6,
          "ANGGOTA_7": this.anggota_l_7,
          "ANGGOTA_8": this.anggota_l_8,
          "GENDER": "1",
          "USERNAME": this.username_putra,
          "PASSWORD": this.password_putra
        },
        {
          "NAMA_REGU": this.regu_putri,
          "NAMA_BINDAMPING_PUTRA": "",
          "NAMA_BINDAMPING_PUTRI": this.bindampingPutri,
          "ANGGOTA_1": this.anggota_p_1,
          "ANGGOTA_2": this.anggota_p_2,
          "ANGGOTA_3": this.anggota_p_3,
          "ANGGOTA_4": this.anggota_p_4,
          "ANGGOTA_5": this.anggota_p_5,
          "ANGGOTA_6": this.anggota_p_6,
          "ANGGOTA_7": this.anggota_p_7,
          "ANGGOTA_8": this.anggota_p_8,
          "GENDER": "0",
          "USERNAME": this.username_putri,
          "PASSWORD": this.password_putra
        }
      ]
    };

    console.log(data);


    this.api.postData('api/master/register-peserta', data).subscribe(
      (response) => {
        console.log('Data posted successfully:', response);
        this.messages = [
          { life: 3000, severity: 'success', summary: response?.message }
        ];
      },
      (error) => {
        if (error.status === 400) {
          console.error('Bad Request (400):', error.error?.message || 'Invalid data sent to the server.');
          this.messages = [
            { life: 3000, severity: 'warn', summary: error.error?.message }
          ];
        } else if (error.status === 500) {
          console.error('Internal Server Error (500):', error.error?.message || 'Server encountered an error.');
          this.messages = [
            { life: 3000, severity: 'error', summary: error.error?.message }
          ];
        } else {
          console.error(`Error posting data (Status ${error.status}):`, error.error?.message || error.message || error);
          this.messages = [
            { life: 3000, severity: 'error', summary: 'Mohon maaf terjadi kesalahan pada server' }
          ];
        }
      }
    );

  }

  isFormComplete(): boolean {
    // Check if all fields have values
    return this.pangkalan.trim() !== '' &&
      this.nama_pendaftar.trim() !== '' &&
      this.no_wa.trim() !== '' &&
      this.regu_putra.trim() !== '' &&
      this.bindampingPutra.trim() !== '' &&
      this.anggota_l_1.trim() !== '' &&
      this.anggota_l_2.trim() !== '' &&
      this.anggota_l_3.trim() !== '' &&
      this.anggota_l_4.trim() !== '' &&
      this.anggota_l_5.trim() !== '' &&
      this.anggota_l_6.trim() !== '' &&
      this.anggota_l_7.trim() !== '' &&
      this.anggota_l_8.trim() !== '' &&
      this.regu_putri.trim() !== '' &&
      this.bindampingPutri.trim() !== '' &&
      this.anggota_p_1.trim() !== '' &&
      this.anggota_p_2.trim() !== '' &&
      this.anggota_p_3.trim() !== '' &&
      this.anggota_p_4.trim() !== '' &&
      this.anggota_p_5.trim() !== '' &&
      this.anggota_p_6.trim() !== '' &&
      this.anggota_p_7.trim() !== '' &&
      this.anggota_p_8.trim() !== '' &&
      this.username_putra.trim() !== '' &&
      this.username_putri.trim() !== '' &&
      this.password_putra.trim() !== '' &&
      this.password_putri.trim() !== '';
  }


}
