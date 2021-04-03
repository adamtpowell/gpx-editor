
  let actions = [
    // "reparent": make_command("activity_tree", async function(child_id, new_parent_id) { return NEW_ACTIVITY_TREE }
  ]
 
  // Race conditions on the server are handled by the GUID / ETag, and handwaving. 
  // the ETag is stored with the corresponding resource in the state
  // Race conditions on the client don't matter. Since the commands change state in a functional manner, they always return a valid state.
  // I think this is OK.
  
  // action flow
  // action takes in arguments
  // it uses this to return a patch_content object and a patch_application function.
  // the patch application applies the patch_content to the state.
  // So, the only mutable bit is the final change in state, but state is replaced.
  
  /*

  interface patch() {
    patch_target: function(state, content) -> state,
    patch_content
  }

  */

  function makeCommand(command_function) {
    
  }
  
  function applyPatch(patch) {
    // Apply a patch, which is returned from an action.
  }
  
  let patch_targets = [
    //"activity_tree": setActivityTreeState (this value is from a react hook, for example. It could be any function. It is called with a single value)
    // When a value in patch_targets is patched with the value when a queue action is removed, it is replaced here. 
  ]