import { Vue, Component } from 'vue-property-decorator';

enum SnackType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

@Component
export default class UiMixin extends Vue {
  protected showInfoSnack(msg: string) {
    this.showSnack(msg, SnackType.Info);
  }

  protected showSuccessSnack(msg: string) {
    this.showSnack(msg, SnackType.Success);
  }

  protected showErrorSnack(msg: string) {
    this.showSnack(msg, SnackType.Error);
  }

  private showSnack(msg: string, type: SnackType) {
    this.$notify({
      group: 'notify',
      text: msg,
      type,
    });
  }
}
