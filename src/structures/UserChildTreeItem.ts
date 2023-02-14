import { TreeItem } from "vscode";
import { UserTreeItemData } from "../@types";
import { getIconPath } from "../util";

export default class UserChildTreeItem extends TreeItem {
  iconName?: string;
  userID?: string;
  children?: Map<string, TreeItem>;

  constructor(options: UserTreeItemData) {
    super(options.label!, options.collapsibleState);
    this.description = options.description;
    this.iconName = options.iconName;
    this.tooltip = options.tooltip;
    this.userID = options.userID;
    if (this.iconName)
      this.iconPath = getIconPath(this.iconName);
    if (options.children)
      this.children = new Map(options.children.map((child: any) => [child.label, child]));
  }
}