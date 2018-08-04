import {withRouter} from 'react-router-dom'

function WithRouter(cls) {
  const _cls = withRouter(cls);
  return (...args)=>{
    return new _cls(...args)
  }
}
export {WithRouter as withRouter}