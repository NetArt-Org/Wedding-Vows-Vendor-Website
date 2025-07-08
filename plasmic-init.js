import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import MarkDownConverter from "./components/MarkdownConverter";
import SwiperSlider from "./components/SwiperSlider";
import ClientOnly from "./components/ClientOnly";
import PlasmicHydrationWrapper from "./components/PlasmicHydrationWrapper";
import GoogleLogin from "./components/GoogleLogin";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "avhWh7jXm55bQaiV2QW74L",
      token: "NbUTOWki637RfIgrJPJ0h2MVNCmobeoysnfNlc2ZsIYtlvhSDsuGiba4VjCFhBkA9w1qW4UODFwsnbh4vg",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
  
  // Add hydration options
  onClientSideFetch: "warn",
  onMissingComponent: "warn",
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
PLASMIC.registerComponent(MarkDownConverter, {
  name: 'MarkDownConverter',
  props: {
    children:'string'
  },
});

PLASMIC.registerComponent(SwiperSlider, {
  name: 'SwiperSlider',
  props: {
    children: 'slot',
    navigation:'boolean'
  },
});

PLASMIC.registerComponent(ClientOnly, {
  name: 'ClientOnly',
  props: {
    children: 'slot',
    fallback: 'slot'
  },
});

PLASMIC.registerComponent(PlasmicHydrationWrapper, {
  name: 'PlasmicHydrationWrapper',
  props: {
    children: 'slot',
    fallback: 'slot'
  },
});

PLASMIC.registerComponent(GoogleLogin, {
  name: "GoogleLogin",
  props: {
    onSuccess: "function",
    onError: "function",
    className: "string",
  },
});