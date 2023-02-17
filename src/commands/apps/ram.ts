import { t } from "@vscode/l10n";
import { RESTPutApiAppRamResult, Routes } from "discloud.app";
import { ProgressLocation, window } from "vscode";
import { TaskData } from "../../@types";
import extension from "../../extension";
import AppTreeItem from "../../structures/AppTreeItem";
import Command from "../../structures/Command";
import { requester } from "../../util";

export default class extends Command {
  constructor() {
    super({
      progress: {
        location: ProgressLocation.Notification,
        cancellable: true,
        title: t("progress.ram.title"),
      },
    });
  }

  async run(task: TaskData, item: AppTreeItem = <AppTreeItem>{}) {
    if (!item.appId) {
      item.appId = await this.pickApp(task);
      if (!item.appId) return;
    }

    let ram;
    do {
      ram = await window.showInputBox({
        value: "100",
        prompt: t("input.ram.prompt"),
      });
    } while (typeof ram === "string" ?
        isNaN(Number(ram)) || Number(ram) < 100 :
        false);

    if (!ram) return;

    if (!await this.confirmAction()) return;

    const res = await requester<RESTPutApiAppRamResult>(Routes.appRam(item.appId), {
      body: JSON.stringify({
        ramMB: parseInt(ram),
      }),
      method: "PUT",
    });

    if ("status" in res) {
      window.showWarningMessage(`${res.status}: ${res.message}`);

      if (res.status === "ok")
        await extension.appTree.getStatus(item.appId);
    }
  }
}
