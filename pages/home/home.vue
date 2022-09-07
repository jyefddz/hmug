<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>

    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in banners" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="goGoodsDetail(item.goods_id)" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view @click="clickNav(item)" class="nav-item" v-for="(item, i) in navs" :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floors" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>

        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image :style="{width:item.product_list[0].image_width+'rpx'}" class="left-img"
              :src="item.product_list[0].image_src"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view v-for="(item2,i) in item.product_list" v-if="i !== 0" :key="i" class="right-img-item">
              <image mode="widthFix" :style="{width:item2.image_width+'rpx'}" :src="item2.image_src"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getBanners,
    getNavs,
    getFloors
  } from '@/api/home.js'
  export default {
    data() {
      return {
        banners: [],
        navs: [],
        floors: []
      };
    },
    methods: {
      // 轮播图
      async loadBanners() {
        const res = await getBanners()
        this.banners = res
      },
      // 分类导航
      async loadNavs() {
        const res = await getNavs()
        this.navs = res
      },
      // 楼层图片
      async loadFloors() {
        const res = await getFloors()
        this.floors = res
      },
      goGoodsDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      clickNav(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
    },
    onLoad() {
      this.loadBanners()
      this.loadNavs()
      this.loadFloors()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #c00000;
    overflow: hidden;

    .search_btn {
      height: 30px;
      width: 70%;
      margin-top: 30px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
