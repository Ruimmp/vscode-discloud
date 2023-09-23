import UserTreeItem from "../structures/UserTreeItem";
import VSUser from "../structures/VSUser";
import BaseTreeDataProvider from "./BaseTreeDataProvider";

export default class UserTreeDataProvider extends BaseTreeDataProvider<UserTreeItem> {
  constructor(viewId: string) {
    super(viewId);
  }

  clear() {
    this.children.clear();
    this.refresh();
  }

  update(user: VSUser) {
    this.children.clear();
    this.children.set(`${user.userID}`, new UserTreeItem(user));
    this.refresh();
  }
}
