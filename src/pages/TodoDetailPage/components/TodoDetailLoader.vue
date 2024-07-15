<template>
	<div class="absolute top-0 left-0 w-full h-[100vh] bg-gray-600 bg-opacity-50">
		<div
			class="absolute bg-white rounded-lg p-4 w-[320px] left-0 right-0 mx-auto translate-y-[-50%] top-[50%]"
		>
			<div class="animate-pulse flex py-2 px-3 justify-center">
				<div class="bg-gray-200 h-4 w-[80%]" />
			</div>
			<form class="animate-pulse">
				<label class="form-control w-full max-w-xs">
					<input
						name="text"
						type="text"
						placeholder="Title"
						class="input input-bordered w-full max-w-xs mt-4 focus:outline-1"
						autoComplete="false"
						disabled
					/>
				</label>
				<label class="form-control mt-4">
					<textarea
						class="textarea textarea-bordered h-24 resize-none"
						placeholder="Description"
						disabled
					></textarea>
				</label>
				<button type="submit" class="btn btn-primary w-full mt-4" disabled>
					Update
				</button>
			</form>
		</div>
	</div>
</template>
