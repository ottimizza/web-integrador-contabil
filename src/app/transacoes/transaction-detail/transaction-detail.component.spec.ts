// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { TransactionDetailComponent } from './transaction-detail.component';
// import { LancamentoService } from '@shared/services/lancamento.service';
// import { RuleService } from '@shared/services/rule.service';
// import { HistoricService } from '@shared/services/historic.service';
// import { MatDialog } from '@angular/material/dialog';
// import { TestHelper } from '@shared/test-helpers/test-helpers';
// import { Rule } from '@shared/models/Rule';

// describe('Component: TransactionDetail', () => {

//   let fixture: ComponentFixture<TransactionDetailComponent>;
//   let component: TransactionDetailComponent;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TransactionDetailComponent],
//       providers: [
//         LancamentoService,
//         RuleService,
//         HistoricService,
//         MatDialog
//       ]
//     });
//     fixture = TestBed.createComponent(TransactionDetailComponent);
//     component = fixture.componentInstance;
//   });

//   it('getter suggestions deve retornar uma string em branco quando não houver sugestões', () => {
//     expect(component.suggestions).toEqual('');
//   });

//   it('método getComplementos() deve retornar false quando não houver complementos', () => {
//     expect(component.getComplementos().ok).toBeFalsy();
//   });

//   describe('método resetErrors()', () => {

//     let texto1: string;
//     let texto2: string;

//     beforeEach(() => {
//       texto1 = TestHelper.ipsum(40);
//       texto2 = TestHelper.ipsum(70);
//     });

//     it('deve limpar os dois campos de erro se não houver erros', () => {
//       component.resetErrors();
//       expect(component.errorText).toBeNull();
//       expect(component.errorText2).toBeNull();
//     });

//     it('deve exibir o primeiro campo de erro e ocultar o segundo quando houver apenas um erro', () => {
//       component.resetErrors([texto1]);
//       expect(component.errorText).toEqual(texto1);
//       expect(component.errorText2).toBeNull();
//     });

//     it('deve exibir os dois campos de erro caso haja mais de um erro', () => {
//       component.resetErrors([texto1, texto2]);
//       expect(component.errorText).toEqual(texto1);
//       expect(component.errorText2).toEqual(texto2);
//     });

//   });

//   it('método disable() deve reiniciar as variáveis de exibição', fakeAsync(() => {
//     component.disable();
//     tick();
//     expect(component.destroy).toBeFalsy();
//     expect(component.conditions).toEqual(new Rule());
//     expect(component.account).toBeNull();
//   }));

// });
