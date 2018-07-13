import '../assets/styles/footer.styl'
// import className from '../assets/styles/footer.styl'
export default {
  data() {
    return {
      author: 'Jin'
    }
  },
  render() {
    return (
      // 下面是使用css-loader的css module功能
      // <div id={className.footer}>
      <div id="footer">
        <span>Written By {this.author}</span>
      </div>
    )
  }
}
