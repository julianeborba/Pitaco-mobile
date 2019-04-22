import { CadastroDTO } from "../models/dadosUsuario";
import { Component, ɵConsole } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  AlertController,
  Item,
  ModalController
} from "ionic-angular";
import { ServidorProvider } from "../../providers/servidor/servidor";
import { UsuarioPage } from "../usuario/usuario";
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import { CredenciaisDTO } from "../models/credenciais";
import { EditarDTO } from "../models/editar";

@Component({
  selector: "page-editar",
  templateUrl: "editar.html"
})
export class EditarPage {
  form: FormGroup;

  /* usuario: CredenciaisDTO = {
     login_usuario: JSON.parse(localStorage.getItem('usuario')),
     senha: ""
   };*/

  // usuario  = JSON.parse(localStorage.getItem('usuario'))
  usuario: EditarDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    nome: "",
    cpf: "",
    faixa_salarial: "",
    data_nascimento: "",
    endereco: {
      rua: "",
      complemento: "",
      bairro: "",
      cidade: "",
      cep: "",
      estado: ""
    }
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public alertCtrl: AlertController,
    public toast: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
    this.servidor
      .obterDadosUsuario(this.usuario.login_usuario)
      .subscribe(dadosPorUsuario => {
        console.log(dadosPorUsuario);

        this.form.get("email").setValue(dadosPorUsuario.login_usuario);
        this.form.get("nome").setValue(dadosPorUsuario.nome);
        this.form.get("cpf").setValue(dadosPorUsuario.cpf);
        this.form.get("texto").setValue(dadosPorUsuario.data_nascimento);
        this.form.get("rua").setValue(dadosPorUsuario.endereco[0].rua);
        this.form.get("complemento").setValue(dadosPorUsuario.endereco[0].complemento);
        this.form.get("bairro").setValue(dadosPorUsuario.endereco[0].bairro);
        this.form.get("cidade").setValue(dadosPorUsuario.endereco[0].cidade);
        this.form.get("estado").setValue(dadosPorUsuario.endereco[0].estado);
        this.form.get("cep").setValue(dadosPorUsuario.endereco[0].cep);
        this.form.get("opcao").setValue(dadosPorUsuario.faixa_salarial);

        console.log("oiii", dadosPorUsuario.texto);
        console.log("oiii", dadosPorUsuario.opcao);
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.email]],
      rua: [, Validators.required],
      nome: ["", [Validators.required]],
      texto: ["", [Validators.required]],
      complemento: ["", [Validators.required]],
      bairro: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cep: ["", [Validators.required]],
      opcao: ["", [Validators.required]],
      cpf: [
        "",
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ]
    });
  }

  get email() {
    return this.form.get("email");
  }
  get rua() {
    return this.form.get("rua");
  }
  get complemento() {
    return this.form.get("complemento");
  }
  get bairro() {
    return this.form.get("bairro");
  }
  get cidade() {
    return this.form.get("cidade");
  }
  get estado() {
    return this.form.get("estado");
  }
  get cep() {
    return this.form.get("cep");
  }
  get nome() {
    return this.form.get("nome");
  }
  get texto() {
    return this.form.get("texto");
  }
  get opcao() {
    return this.form.get("opcao");
  }
  get cpf() {
    return this.form.get("cpf");
  }

  editarUsuario() {
    this.servidor.atualizarUsuario(this.usuario).subscribe(
      data => {
        this.navCtrl.setRoot(UsuarioPage);
        this.toast
          .create({
            message: "Usuário atualizado com Sucesso ",
            position: "botton",
            duration: 3000
          })
          .present();
      },
      error => {
        console.log(error);
        this.toast
          .create({
            message:
              "Erro ao realizar atualização cadastral. Erro: " +
              error.error.message,
            position: "botton",
            duration: 3000
          })
          .present();
      }
    );
  }
}
