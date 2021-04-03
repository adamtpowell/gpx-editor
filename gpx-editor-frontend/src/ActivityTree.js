function ActivityTree(activity_tree_json, id) {
    this._nodes_by_id = {}
    for (let activity of activity_tree_json) {
        this._nodes_by_id[activity.id] = new ActivityTreeNode(this, activity);
    }
}

ActivityTree.prototype.getRoot = function() {
    return this._nodes_by_id[0]; // todo: better logic for the root.
}

ActivityTree.prototype.getActivityById = function(id) {
    return this._nodes_by_id[id];
}

ActivityTree.prototype.clone = function() {
    let newTree = Object.create(ActivityTree.prototype);

    newTree._nodes_by_id = {};
    for (let activity_id in this._nodes_by_id) {
        newTree._nodes_by_id[activity_id] = this._nodes_by_id[activity_id].clone(newTree);
    }

    return newTree;
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

ActivityTreeNode.prototype.clone = function(newTree) {
    let newNode = Object.create(ActivityTreeNode.prototype);

    newNode = new ActivityTreeNode(newTree, {
        id: this.id,
        type: this.type,
        metadata: Object.assign({}, this.metadata), // shallow copy metadata
        data: Object.assign({}, this.data),
        children: [...this.child_ids],
    });

    return newNode;
}

export { ActivityTree };