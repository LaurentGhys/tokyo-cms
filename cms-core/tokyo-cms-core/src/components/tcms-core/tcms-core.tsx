import { Component, h, Prop } from '@stencil/core';
import { GetAppLangs, GetLabels } from '../abstractions';
import { state } from '../store';

@Component({
  tag: 'tcms-core',
  styleUrl: 'tcms-core.css',
  shadow: true,
})
export class TcmsCore {

  @Prop() appId: string = 'bastide-ventoux'

  componentDidLoad() {
    this.setLabels()
    this.setAppId()
    this.setLangs()
  }

  private async setLabels() {
    let labels = await GetLabels(this.appId)
    state.labels = labels
  }

  private setAppId() { state.appId = this.appId }

  private async setLangs() {
    let langs = await GetAppLangs(this.appId)
    state.lang = langs[0]
    state.langs = langs
  }

  render() {
    return (
      <div>
        <div>Hellow I'm the core</div>
      </div>
    );
  }

}
