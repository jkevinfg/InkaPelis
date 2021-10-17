
function buildMessage(entity , action){
  if(action === 'list'){
    return `${entity}s  ${entity}ed`
  }
  return `${entity} ${action}d`;
}

module.exports = buildMessage;