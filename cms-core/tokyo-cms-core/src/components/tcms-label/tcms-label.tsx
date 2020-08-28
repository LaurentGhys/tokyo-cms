import { Component, forceUpdate, h, Prop, State } from '@stencil/core';
import { UpdateLabelValue } from '../abstractions';
import { state } from '../store';

@Component({
  tag: 'tcms-label',
  styleUrl: 'tcms-label.css',
  assetsDirs: ['assets'],
  shadow: false,
})
export class TcmsLabel {

  @Prop() default: string;
  @Prop() contentclass: string;
  @Prop() labelid: string = ''

  @State() newValue: string = ''
  @State() selectedLang: string = ''
  @State() editMode: boolean = true
  @State() updatingLabel: boolean = false

  private contentInput: HTMLDivElement

  private getFlagImageUrl = (lang): string => `https://www.countryflags.io/${lang}/flat/48.png`

  private isVisualMode(): boolean {
    return !this.isEditMode()
  }

  private isEditMode(): boolean {
    return this.editMode
  }

  private getDefaultValue(): string {
    return (this.getDatabaseValue() === '' ?
      this.default : this.getDatabaseValue())
  }

  private getLang(): string {
    return (this.selectedLang === '' ? state.lang : this.selectedLang)
  }

  private getDatabaseValue(): string {
    let label = state.labels[this.labelid]
    if (label !== undefined && label.values !== null && label.values[this.getLang()] !== null) {
      return label.values[this.getLang()]
    }
    return ''
  }

  private endEditMode(): void {
    this.editMode = false
    this.updatingLabel = false
  }

  private contentChanged(event): void {
    this.newValue = event.target.innerHTML
  }

  private contentClicked(): void {
    this.editMode = true
  }

  private async applyClicked() {
    if (!this.updatingLabel) {
      this.updatingLabel = true
      let response = await UpdateLabelValue(this.labelid, this.getLang(), this.newValue)
      console.log(response)
      if (response.ok) {
        this.updatingLabel = false;
        this.newValue = ''
      } else {
        // should send an error message
      }
    }
  }

  private discardClicked(): void {
    this.newValue = ''
    this.contentInput.innerHTML = this.getDefaultValue()
  }

  private langFlagClicked(lang: string): void {
    this.selectedLang = lang
    forceUpdate(this)
    this.contentInput.innerHTML = this.getDefaultValue()
  }

  private closeClicked(): void {
    this.endEditMode()
  }

  render() {
    return (
      <div class={'label-root ' + (this.isVisualMode() ? 'label-root__visual-mode' : '')}>
        <div
          contenteditable
          onInput={(e) => this.contentChanged(e)}
          onClick={() => this.contentClicked()}
          ref={el => this.contentInput = el}
          class={this.contentclass + (this.isEditMode() ? ' label-content__edit-mode' : '')}>
          {this.getDefaultValue()}
        </div>
        {this.isEditMode() && (
          <div>
            {this.newValue === '' ?
              (<div class='card-raised lang-buttons'>
                {state.langs.map(lang => (
                  <div onClick={() => this.langFlagClicked(lang)}
                    class='lang-buttons--button'>
                    <img src={this.getFlagImageUrl(lang)} />
                  </div>
                ))}
                <button
                  class='edit-buttons--button button__primary button__raised'
                  onClick={() => this.closeClicked()}>Close</button>

              </div>)
              :
              (
                <div>
                  {this.updatingLabel ?
                    (
                      <div class='card-raised edit-buttons'>
                        <button
                          class='button__disabled button__raised'>
                          Updating...
                        </button>
                      </div>
                    ) :
                    (
                      <div class='card-raised edit-buttons'>
                        <button
                          class='edit-buttons--button button__primary button__raised'
                          onClick={() => this.applyClicked()}>Apply</button>
                        <button
                          class='edit-buttons--button button__secondary button__raised'
                          onClick={() => this.discardClicked()}>Discard</button>
                      </div>
                    )}
                </div>
              )
            }
          </div>
        )}
      </div>
    );
  }

}
