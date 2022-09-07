// 普通提示
function toast(title, duration = 3000) {
  uni.showToast({
    title,
    icon: 'none',
    duration
  })
}
// toast('你好', 2000)

// 失败提示 toast.err('网络错误')
toast.err = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: 'error',
    duration
  })
}

// 成功提示 toast.success('成功')
toast.success = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: 'success',
    duration
  })
}

// loading提示
toast.loading = (title, duration) => {
  uni.showToast({
    title: '正在加载中...',
    icon: 'loading'
  })
}

export default toast
