function ActivityTree(activity_tree_json, id) {
    this._nodes_by_id = {}
    for (let activity of activity_tree_json) {
        this._nodes_by_id[activity.id] = new ActivityTreeNode(this, activity);
    }
}

ActivityTree.prototype.getRoot = function() {
    console.log(this._nodes_by_id[0]);
    return this._nodes_by_id[0]; // todo: better logic for the root.
}

ActivityTree.prototype.getActivityById = function(id) {
    return this._nodes_by_id[id];
}

function ActivityTreeNode(tree, activity_json) {
    this._tree = tree;
    this.id = activity_json.id;
    this.type = activity_json.type;
    this.metadata = activity_json.metadata;
    this.data = activity_json.data;
    this.child_ids = activity_json.children;
}

ActivityTreeNode.prototype.getChildren = function() {
    return this.child_ids.map(child_id=>this._tree._nodes_by_id[child_id])
}

export { ActivityTree };