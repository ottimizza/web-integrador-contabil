import { RuleConfiguratorComponent } from './rule-configurator.component';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { TestHelper } from '@shared/test-helpers/test-helpers';

describe('Component: RuleConfigurator', () => {

  let component: RuleConfiguratorComponent;

  beforeEach(() => {
    component = new RuleConfiguratorComponent(Inject(DOCUMENT));
  });

  describe('Getter text', () => {

    beforeEach(() => {
      component.name = TestHelper.ipsum();
    });

    it('Deve iniciar com "Se" caso seja a primeira regra', () => {
      component.isFirst = true;
      const text = component.text.charAt(0) + component.text.charAt(1);
      expect(text).toEqual('Se');
    });

    it('Deve iniciar com "e" caso não seja a primeira regra', () => {
      component.isFirst = false;
      expect(component.text.charAt(0)).toEqual('e');
    });

  });

  describe('Getter content', () => {

    beforeEach(() => {
      component.property = TestHelper.ipsum();
    });

    it('Deve retornar um string com no máximo 43 caracteres', () => {
      expect(component.content.length).toBeLessThan(44);
    });

    it('Deve retornar uma string terminada em "," caso a lista continue', () => {
      component.continue = true;
      expect(component.content.charAt(component.content.length - 1)).toEqual(',');
    });

    it('Deve retornar uma string terminada em "." caso a lista não continue', () => {
      component.continue = false;
      expect(component.content.charAt(component.content.length - 1)).toEqual('.');
    });

  });

});
