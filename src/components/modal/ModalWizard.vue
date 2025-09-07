<!-- components/Modal.vue -->
<template>
    <div id="kt_modal_create_app" class="modal fade" tabindex="-1" :class="{ show: modelValue }" style="display: block;" v-if="modelValue">
        <div class="modal-dialog modal-dialog-centered mw-950px">
            <div class="modal-content rounded">
                <!-- Modal Header -->
                <div class="modal-header pb-0 border-0 justify-content-end">
                    <button type="button" class="btn btn-sm btn-icon btn-active-color-primary" @click="close">
                        <i class="ki-duotone ki-cross fs-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </button>
                </div>
                <!-- Modal Body -->
                <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                    <!--begin::Stepper-->
	<div class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid" id="kt_modal_create_app_stepper">
		<!--begin::Aside-->
		<div class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
			<!--begin::Nav-->
			<div class="stepper-nav ps-lg-10">
				<!--begin::Step 1-->
				<div class="stepper-item current" data-kt-stepper-element="nav">
					<!--begin::Wrapper-->
					<div class="stepper-wrapper">
						<!--begin::Icon-->
						<div class="stepper-icon w-40px h-40px">
							<i class="ki-duotone ki-check stepper-check fs-2"></i>
							<span class="stepper-number">1</span>
						</div>
						<!--end::Icon-->
						<!--begin::Label-->
						<div class="stepper-label">
							<h3 class="stepper-title">Details</h3>
							<div class="stepper-desc">Name your App</div>
						</div>
						<!--end::Label-->
					</div>
					<!--end::Wrapper-->
					<!--begin::Line-->
					<div class="stepper-line h-40px"></div>
					<!--end::Line-->
				</div>
				<!--end::Step 1-->
				<!--begin::Step 2-->
				<div class="stepper-item" data-kt-stepper-element="nav">
					<!--begin::Wrapper-->
					<div class="stepper-wrapper">
						<!--begin::Icon-->
						<div class="stepper-icon w-40px h-40px">
							<i class="ki-duotone ki-check stepper-check fs-2"></i>
							<span class="stepper-number">2</span>
						</div>
						<!--begin::Icon-->
						<!--begin::Label-->
						<div class="stepper-label">
							<h3 class="stepper-title">Frameworks</h3>
							<div class="stepper-desc">Define your app framework</div>
						</div>
						<!--begin::Label-->
					</div>
					<!--end::Wrapper-->
					<!--begin::Line-->
					<div class="stepper-line h-40px"></div>
					<!--end::Line-->
				</div>
				<!--end::Step 2-->
				<!--begin::Step 5-->
				<div class="stepper-item mark-completed" data-kt-stepper-element="nav">
					<!--begin::Wrapper-->
					<div class="stepper-wrapper">
						<!--begin::Icon-->
						<div class="stepper-icon w-40px h-40px">
							<i class="ki-duotone ki-check stepper-check fs-2"></i>
							<span class="stepper-number">5</span>
						</div>
						<!--end::Icon-->
						<!--begin::Label-->
						<div class="stepper-label">
							<h3 class="stepper-title">Completed</h3>
							<div class="stepper-desc">Review and Submit</div>
						</div>
						<!--end::Label-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Step 5-->
			</div>
			<!--end::Nav-->
		</div>
		<!--begin::Aside-->
		<!--begin::Content-->
		<div class="flex-row-fluid py-lg-5 px-lg-15">
			<!--begin::Form-->
            <slot name="form" />
			<form class="form" novalidate="novalidate" id="kt_modal_create_app_form">
				<!--begin::Step 1-->
				<div class="current" data-kt-stepper-element="content">
					<div class="w-100">
						<!--begin::Input group-->
						<div class="fv-row mb-10">
							<!--begin::Label-->
							<label class="d-flex align-items-center fs-5 fw-semibold mb-2">
								<span class="required">App Name</span>
								<span class="ms-1" data-bs-toggle="tooltip" title="Specify your unique app name">
									<i class="ki-duotone ki-information-5 text-gray-500 fs-6">
										<span class="path1"></span>
										<span class="path2"></span>
										<span class="path3"></span>
									</i>
								</span>
							</label>
							<!--end::Label-->
							<!--begin::Input-->
							<input type="text" class="form-control form-control-lg form-control-solid" name="name" placeholder="" value="" />
							<!--end::Input-->
						</div>
						<!--end::Input group-->
						<!--begin::Input group-->
						<div class="fv-row">
							<!--begin::Label-->
							<label class="d-flex align-items-center fs-5 fw-semibold mb-4">
								<span class="required">Category</span>
								<span class="ms-1" data-bs-toggle="tooltip" title="Select your app category">
									<i class="ki-duotone ki-information-5 text-gray-500 fs-6">
										<span class="path1"></span>
										<span class="path2"></span>
										<span class="path3"></span>
									</i>
								</span>
							</label>
							<!--end::Label-->
							<!--begin:Options-->
							<div class="fv-row">
								<!--begin:Option-->
								<label class="d-flex flex-stack mb-5 cursor-pointer">
									<!--begin:Label-->
									<span class="d-flex align-items-center me-2">
										<!--begin:Icon-->
										<span class="symbol symbol-50px me-6">
											<span class="symbol-label bg-light-primary">
												<i class="ki-duotone ki-compass fs-1 text-primary">
													<span class="path1"></span>
													<span class="path2"></span>
												</i>
											</span>
										</span>
										<!--end:Icon-->
										<!--begin:Info-->
										<span class="d-flex flex-column">
											<span class="fw-bold fs-6">Quick Online Courses</span>
											<span class="fs-7 text-muted">Creating a clear text structure is just one SEO</span>
										</span>
										<!--end:Info-->
									</span>
									<!--end:Label-->
									<!--begin:Input-->
									<span class="form-check form-check-custom form-check-solid">
										<input class="form-check-input" type="radio" name="category" value="1" />
									</span>
									<!--end:Input-->
								</label>
								<!--end::Option-->
								<!--begin:Option-->
								<label class="d-flex flex-stack mb-5 cursor-pointer">
									<!--begin:Label-->
									<span class="d-flex align-items-center me-2">
										<!--begin:Icon-->
										<span class="symbol symbol-50px me-6">
											<span class="symbol-label bg-light-danger">
												<i class="ki-duotone ki-element-11 fs-1 text-danger">
													<span class="path1"></span>
													<span class="path2"></span>
													<span class="path3"></span>
													<span class="path4"></span>
												</i>
											</span>
										</span>
										<!--end:Icon-->
										<!--begin:Info-->
										<span class="d-flex flex-column">
											<span class="fw-bold fs-6">Face to Face Discussions</span>
											<span class="fs-7 text-muted">Creating a clear text structure is just one aspect</span>
										</span>
										<!--end:Info-->
									</span>
									<!--end:Label-->
									<!--begin:Input-->
									<span class="form-check form-check-custom form-check-solid">
										<input class="form-check-input" type="radio" name="category" value="2" />
									</span>
									<!--end:Input-->
								</label>
								<!--end::Option-->
								<!--begin:Option-->
								<label class="d-flex flex-stack cursor-pointer">
									<!--begin:Label-->
									<span class="d-flex align-items-center me-2">
										<!--begin:Icon-->
										<span class="symbol symbol-50px me-6">
											<span class="symbol-label bg-light-success">
												<i class="ki-duotone ki-timer fs-1 text-success">
													<span class="path1"></span>
													<span class="path2"></span>
													<span class="path3"></span>
												</i>
											</span>
										</span>
										<!--end:Icon-->
										<!--begin:Info-->
										<span class="d-flex flex-column">
											<span class="fw-bold fs-6">Full Intro Training</span>
											<span class="fs-7 text-muted">Creating a clear text structure copywriting</span>
										</span>
										<!--end:Info-->
									</span>
									<!--end:Label-->
									<!--begin:Input-->
									<span class="form-check form-check-custom form-check-solid">
										<input class="form-check-input" type="radio" name="category" value="3" />
									</span>
									<!--end:Input-->
								</label>
								<!--end::Option-->
							</div>
							<!--end:Options-->
						</div>
						<!--end::Input group-->
					</div>
				</div>
				<!--end::Step 1-->
				<!--begin::Step 2-->
				<div data-kt-stepper-element="content">
					<div class="w-100">
						<!--begin::Input group-->
						<div class="fv-row">
							<!--begin::Label-->
							<label class="d-flex align-items-center fs-5 fw-semibold mb-4">
								<span class="required">Select Framework</span>
								<span class="ms-1" data-bs-toggle="tooltip" title="Specify your apps framework">
									<i class="ki-duotone ki-information-5 text-gray-500 fs-6">
										<span class="path1"></span>
										<span class="path2"></span>
										<span class="path3"></span>
									</i>
								</span>
							</label>
							<!--end::Label-->
							<!--begin:Option-->
							<label class="d-flex flex-stack cursor-pointer mb-5">
								<!--begin:Label-->
								<span class="d-flex align-items-center me-2">
									<!--begin:Icon-->
									<span class="symbol symbol-50px me-6">
										<span class="symbol-label bg-light-warning">
											<i class="ki-duotone ki-html fs-2x text-warning">
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
										</span>
									</span>
									<!--end:Icon-->
									<!--begin:Info-->
									<span class="d-flex flex-column">
										<span class="fw-bold fs-6">HTML5</span>
										<span class="fs-7 text-muted">Base Web Projec</span>
									</span>
									<!--end:Info-->
								</span>
								<!--end:Label-->
								<!--begin:Input-->
								<span class="form-check form-check-custom form-check-solid">
									<input class="form-check-input" type="radio" checked="checked" name="framework" value="1" />
								</span>
								<!--end:Input-->
							</label>
							<!--end::Option-->
							<!--begin:Option-->
							<label class="d-flex flex-stack cursor-pointer mb-5">
								<!--begin:Label-->
								<span class="d-flex align-items-center me-2">
									<!--begin:Icon-->
									<span class="symbol symbol-50px me-6">
										<span class="symbol-label bg-light-success">
											<i class="ki-duotone ki-react fs-2x text-success">
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
										</span>
									</span>
									<!--end:Icon-->
									<!--begin:Info-->
									<span class="d-flex flex-column">
										<span class="fw-bold fs-6">ReactJS</span>
										<span class="fs-7 text-muted">Robust and flexible app framework</span>
									</span>
									<!--end:Info-->
								</span>
								<!--end:Label-->
								<!--begin:Input-->
								<span class="form-check form-check-custom form-check-solid">
									<input class="form-check-input" type="radio" name="framework" value="2" />
								</span>
								<!--end:Input-->
							</label>
							<!--end::Option-->
							<!--begin:Option-->
							<label class="d-flex flex-stack cursor-pointer mb-5">
								<!--begin:Label-->
								<span class="d-flex align-items-center me-2">
									<!--begin:Icon-->
									<span class="symbol symbol-50px me-6">
										<span class="symbol-label bg-light-danger">
											<i class="ki-duotone ki-angular fs-2x text-danger">
												<span class="path1"></span>
												<span class="path2"></span>
												<span class="path3"></span>
											</i>
										</span>
									</span>
									<!--end:Icon-->
									<!--begin:Info-->
									<span class="d-flex flex-column">
										<span class="fw-bold fs-6">Angular</span>
										<span class="fs-7 text-muted">Powerful data mangement</span>
									</span>
									<!--end:Info-->
								</span>
								<!--end:Label-->
								<!--begin:Input-->
								<span class="form-check form-check-custom form-check-solid">
									<input class="form-check-input" type="radio" name="framework" value="3" />
								</span>
								<!--end:Input-->
							</label>
							<!--end::Option-->
							<!--begin:Option-->
							<label class="d-flex flex-stack cursor-pointer">
								<!--begin:Label-->
								<span class="d-flex align-items-center me-2">
									<!--begin:Icon-->
									<span class="symbol symbol-50px me-6">
										<span class="symbol-label bg-light-primary">
											<i class="ki-duotone ki-vue fs-2x text-primary">
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
										</span>
									</span>
									<!--end:Icon-->
									<!--begin:Info-->
									<span class="d-flex flex-column">
										<span class="fw-bold fs-6">Vue</span>
										<span class="fs-7 text-muted">Lightweight and responsive framework</span>
									</span>
									<!--end:Info-->
								</span>
								<!--end:Label-->
								<!--begin:Input-->
								<span class="form-check form-check-custom form-check-solid">
									<input class="form-check-input" type="radio" name="framework" value="4" />
								</span>
								<!--end:Input-->
							</label>
							<!--end::Option-->
						</div>
						<!--end::Input group-->
					</div>
				</div>
				<!--end::Step 2-->
				<!--begin::Step 5-->
				<div data-kt-stepper-element="content">
					<div class="w-100 text-center">
						<!--begin::Heading-->
						<h1 class="fw-bold text-gray-900 mb-3">Release!</h1>
						<!--end::Heading-->
						<!--begin::Description-->
						<div class="text-muted fw-semibold fs-3">Submit your app to kickstart your project.</div>
						<!--end::Description-->
						<!--begin::Illustration-->
						<div class="text-center px-4 py-15">
							<img src="" alt="" class="mw-100 mh-300px" />
						</div>
						<!--end::Illustration-->
					</div>
				</div>
				<!--end::Step 5-->
				<!--begin::Actions-->
				<div class="d-flex flex-stack pt-10">
					<!--begin::Wrapper-->
					<div class="me-2">
						<button type="button" class="btn btn-lg btn-light-primary me-3" data-kt-stepper-action="previous">
							<i class="ki-duotone ki-arrow-left fs-3 me-1">
								<span class="path1"></span>
								<span class="path2"></span>
							</i>Back</button>
					</div>
					<!--end::Wrapper-->
					<!--begin::Wrapper-->
					<div>
						<button type="button" class="btn btn-lg btn-primary" data-kt-stepper-action="submit">
							<span class="indicator-label">Submit
								<i class="ki-duotone ki-arrow-right fs-3 ms-2 me-0">
									<span class="path1"></span>
									<span class="path2"></span>
								</i></span>
							<span class="indicator-progress">Please wait...
								<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
						</button>
						<button type="button" class="btn btn-lg btn-primary" data-kt-stepper-action="next">Continue
							<i class="ki-duotone ki-arrow-right fs-3 ms-1 me-0">
								<span class="path1"></span>
								<span class="path2"></span>
							</i></button>
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Actions-->
			</form>
			<!--end::Form-->
		</div>
		<!--end::Content-->
	</div>
                    <!--end::Stepper-->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: Boolean,
    isEdit: Boolean,
    studentData: Object,
})

const emit = defineEmits(['update:modelValue', 'submit'])
const close = () => emit('update:modelValue', false)
</script>
<style scoped>
.modal.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}
</style>